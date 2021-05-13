var express       = require('express');
var bodyParser    = require('body-parser');
var mysql_conn     = require('./db_connection/db_connection');
var UV            = require('./router/user_validation');
const bcrypt      =require("bcrypt");

var app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get('/',function(req,resp){

	resp.render('login')

});


app.get('/reg',function(req,resp){

    resp.render('signup')

});

app.post('/reg',function(req,resp){

	var name =req.body.Name
    var dob =req.body.Dob
    var regno =req.body.RegNo
    var branch =req.body.Branch
    var year =req.body.Year
    var email =req.body.email
    var contact =req.body.mobile
    var password =req.body.password
    //var password1=bcrypt.hashSync(req.body.password,10);
    console.log(name+dob+regno+branch+year+email+contact)
	//console.log(req.body)
	var insert_data ={
		NAME:name,
		DOB:dob,
		REGNO:regno,
		BRANCH:branch,
		YEAR:year,
		EMAIL:email,
		MOBILE:contact,
		PASSWORD:password
	
}
	var query = "insert into signup_table set ?"
	mysql_conn.query(query,insert_data,function(err){
		if(!err){
			console.log('data inserted')
		}else{
             console.log(err);
		}
	})
	resp.render('login')

   
})


app.post('/',function(req,resp){

    var regno =req.body.RegNo
    var email =req.body.email
    var password =req.body.password

    UV.UserIdValidation(regno,email,password,function(data){
		if(data==0){
			console.log('Database Error');
			resp.render('success',{error_id:0,msg:'Database Error'});

		}else if(data==1){
			console.log('Invalid User Id')
			resp.render('success',{error_id:1,msg:'Invalid User Id'});
		}else if(data==2){
			console.log('Invalid Email ID');
			resp.render('success',{error_id:2,msg:'Invalid Email ID'});
		}else if(data==3){
            console.log('Invalid Password');
            resp.render('success',{error_id:3,msg:'Invalid Password'});
        }
		else{
			resp.render('form');
		}
	})	
})

app.listen('98',()=>console.log('Server running at port 98'));