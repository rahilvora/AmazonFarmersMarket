var express = require('express');
var router = express.Router();
var connection = require('../MySQLConfig.js');

var mongo = require('../MongoConfig.js');

var mongoURL = "mongodb://localhost:27017/amazonfresh";
var productsCollection;

mongo.connect(mongoURL, function() {
    console.log('Connected to mongo at: ' + mongoURL);
    productsCollection = mongo.collection('productdetails');
});



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
    var customerid = req.session.username;
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



router.get('/getHomeDashboard', function (req, res, next) {
    console.log("inside dashboard node");
    productsCollection.find({}).toArray(function (err,data) {
        if(data){
           // console.log(data);
            res.send(data);
        }
    });
});

router.post('/addProductToCart', function (req, res, next) {

    var product = req.body.product;
    console.log("product added : " + JSON.stringify(product));



    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('carts');

        coll.update(
                {cartid: req.session.username},
                {$push: {products: product}}, function (err, result) {
                    if (result) {
                        console.log(result);
                    }
                    else {
                        console.log("returned false");
                    }
                });
    });
});


router.get('/getCart', function (req, res, next) {

    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('carts');
        
        coll.find({cartid:req.session.username}).toArray(function (err,data) {
            if(data){
                console.log(data);
                var total = 0;
                for(var a in data[0].products){
                   total += Number(data[0].products[a].productprice);
                }
                total = Number(total.toFixed(2));
                var json_responses = {"cartItems" : data[0].products, "cartTotal" : total}
                console.log("Cart total is "+total);
                res.send(json_responses);
            }
        });
    });
});

router.post('/getSearchResults', function (req, res, next) {
    var searchItem = req.body.searchItem;
    console.log("searchItem is :"+searchItem);
    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('productdetails');

        coll.createIndex({"productname" : "text"}, function (err, results) {
                coll.find({$text: {$search: searchItem}}).toArray(function (err, items) {
                    console.log(items);
                    res.send(items);
                })
            }
        );
    });
});


module.exports = router;