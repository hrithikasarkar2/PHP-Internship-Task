var express       = require('express');
var bodyParser    = require('body-parser');
const mysql_conn   =  require('./db_connection/db_connection');
const bcrypt		=require('bcrypt');
var app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');


app.use(express.static(__dirname + '/public'));
app.use("/public", express.static('public')); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


//console.log('log file ')
app.get('/',function(req,resp){

	resp.render('signup')


});
//RUN INSERT NEW FIELD PAS
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
	resp.render('success',{title:'Home Page',status:'Successfully registered'})

   
})

app.listen('98',()=>console.log('Server running at port 98'));