var express = require('express');
var router = express.Router();
var connection = require('../MySQLConfig.js');

//Connecting to MySQL
/*
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});*/


router.get('/', function (req, res, next) {
    res.render('loginAndSignUp/login.ejs');
});


router.post('/checkLogin', function (req, res, next) {
    var password, email;
    password = req.body.password;
    //password = crypto.createHash("sha1").update(password).digest("HEX");
    email = req.body.email;

    var json_responses;

    var getUser="select * from customerdetails where email='"+email+"' and password='"+password+"';"
    console.log("Query for Login is:"+getUser);


    connection.query(getUser, function (err, results) {
        if(err){
            throw err;
        }
        else if (results.length > 0){
            var rows = results;
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            console.log("Results: "+(rows[0].firstname));
            //  req.session.username = rows[0].firstname;
            //console.log("Session initialized for '"+req.session.username+"' user");
            json_responses = {"statusCode" : "validLogin"};
            res.send(json_responses);
        } else {
            json_responses = {"statusCode" : "invalidLogin"};
            res.send(json_responses);
        }
    });
});

module.exports = router;