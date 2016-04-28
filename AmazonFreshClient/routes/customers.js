var express = require('express');
var router = express.Router();
var connection = require('../MySQLConfig.js');




router.get('/', function (req, res, next) {
    res.render('loginAndSignUp/signUpForm.ejs');
});

router.post('/checkUser',function(req,res,next){

    var customerid,firstname, lastname, address, city, state,zipcode,phonenumber, email, ccnumber, password;

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    email = req.body.email;
    password = req.body.password;
    customerid = req.body.customerid;
    address=req.body.address;
    city=req.body.city;
    zipcode= req.body.zipcode;
    phonenumber= req.body.phonenumber;
    ccnumber=req.body.ccnumber;
    var json_responses;

    var getUser="select * from customerdetails where customerid='"+customerid+"'";
    console.log("get customer query is:"+getUser);

    connection.query(getUser,function(err,results){
        if(err){
            throw err;
        }
        else{
            if(results.length > 0){
                console.log("User Exists");
                json_responses = {"statusCode" : "userExists"};
                res.send(json_responses);
            }
            else {
                var addUser = "INSERT INTO customerdetails (customerid, firstname, lastname, address, city, state, zipcode, phonenumber, email, ccnumber, password) values ('"+customerid+"','"+firstname+"','"+lastname+"','"+address+"','"+city+"','"+state+"','"+zipcode+"','"+phonenumber+"','"+email+"','"+ccnumber+"','"+password+"')";
                console.log(" adduser Query is:"+addUser);
                connection.query(addUser,function(err,result){
                    if(err){
                        throw err;
                    }
                    else{
                        console.log("user created");
                        json_responses = {"statusCode" : "userCreated"};
                        res.send(json_responses);
                    }
                });
            }
        }
    })
});



router.get('/customerHome', function (req, res, next) {
    res.render('customerViews/customerHome.ejs');
});



router.get('/getCustomerDetails' , function (req, res, next) {
    var customerid = "555-55-5555";
    var getUser = "select * from customerdetails where customerid='" + customerid + "'";

    connection.query(getUser, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            if (results.length > 0) {

                var rows = results;
                var jsonString = JSON.stringify(results);
                var jsonParse = JSON.parse(jsonString);
                var customerid = rows[0].customerid;
                var firstname = rows[0].firstname;
                var lastname = rows[0].lastname;
                var city = rows[0].city;
                var state = rows[0].state;
                var zipcode = rows[0].zipcode;
                var phonenumber = rows[0].phonenumber;
                var email = rows[0].email;
                var ccnumber = rows[0].ccnumber;
                var password = rows[0].password;
                var address = rows[0].address;

                var json_responses = {
                    "customerid": customerid,
                    "firstname": firstname,
                    "lastname": lastname,
                    "city": city,
                    "state": state,
                    "zipcode": zipcode,
                    "phonenumber": phonenumber,
                    "email": email,
                    "ccnumber": ccnumber,
                    "password": password,
                    "address": address
                };
               // console.log("get customer profile for " + data.firstname);
                res.send(json_responses);
            }
        }
    });
});

router.put('/updateUserProfile' , function (req, res, next) {
        var json_responses;
        var updateProfileQuery = "UPDATE customerdetails SET firstname='" + req.body.firstname + "', lastname='" + req.body.lastname + "', email='" + req.body.email + "',address='" + req.body.address + "',city='" + req.body.city + "', state='" + req.body.state + "', zipcode='" + req.body.zipcode + "',password='" + req.body.password + "', phonenumber='" + req.body.phonenumber + "', ccnumber='" + req.body.ccnumber + "' where customerid='" + req.body.customerid + "'";
        console.log("get updateProfile query is:" + updateProfileQuery);

        connection.query(updateProfileQuery, function (err, results) {
            if (err) {
                throw err;
            }
            else {
                console.log("user profile updated");
                json_responses = {"statusCode": "profileUpdated"};
                res.send(json_responses);
            }
        });
});


router.get('/getCart', function (req, res, next) {
    ///res.render('customerViews/customerHome.ejs');
    
});



module.exports = router;