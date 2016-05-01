/**
 * Created by rahilvora on 21/04/16.
 */
var express = require('express');
var router = express.Router();
var multer = require('multer');
var connection = require('../MySQLConfig.js');
var mongo = require('../MongoConfig.js');
var drivers = [];

var mongoURL = "mongodb://localhost:27017/amazonfresh";
var productsCollection;

mongo.connect(mongoURL, function () {
    console.log('Connected to mongo at: ' + mongoURL);
    productsCollection = mongo.collection('productdetails');
});

var redis = require('redis');
var jsonify = require('redis-jsonify');
var client = jsonify(redis.createClient(6379, 'localhost', {no_ready_check: true}));
client.on('connect', function() {
    console.log('Connected to Redis');
});
//Connecting to MySQL

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    autoIncrement = require('mongoose-auto-increment');

var mongoseconnection = mongoose.createConnection(mongoURL);
autoIncrement.initialize(mongoseconnection);
var productSchema = new Schema({
    farmerid: String,
    farmername: String,
    category: String,
    productname: String,
    productprice: Number,
    description: String,
    active: String,
    approved: String,
    productimage: String,
    productreviews: [String],
    productrating: Number
});

productSchema.plugin(autoIncrement.plugin, {model: 'productdetail', field: 'productid'});
//var Product = connection.model('Product', productSchema);

//Farmer's Requests

router.get('/getFarmers',function(req,res,next){

    client.get("getFarmer",function(err,result){
        if(result !== null){
            console.log("Sending result from redis")
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `farmerdetails` WHERE flag <> 0";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    //var todayEnd = new Date().setHours(00, 1, 59, 999);
                    client.set("getFarmer",JSON.stringify(result),function(err,ans){
                        client.expire("getFarmer", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.get('/getAddFarmerRequests',function(req,res,next){

    client.get("getAddFarmerRequests",function(err,result){
        if(result !== null){
            console.log("Sending result from redis")
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `farmerdetails` WHERE flag = 0";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getAddFarmerRequests",JSON.stringify(result),function(err,ans){
                        client.expire("getAddFarmerRequests", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.put('/addFarmer', function (req, res) {
    //Update Query
    var query = "UPDATE farmerdetails SET flag = 1 where farmerid = '" + req.body.farmerid + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getFarmer"],["del","getAddFarmerRequests"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.delete('/deleteFarmer', function (req, res) {
    //Update Query
    var query = "DELETE FROM farmerdetails where farmerid = '" + req.query.data + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getFarmer"],["del","getAddFarmerRequests"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

//Product Requests

router.get('/getProducts',function(req,res,next){

    client.get("getProducts",function(err,result){
        if(result !== null){
            console.log("Sending product result from redis")
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `productdetails` WHERE flag <> 0";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getProducts",JSON.stringify(result),function(err,ans){
                        client.expire("getProducts", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.get('/getAddProductRequests',function(req,res,next){
    client.get("getAddProductRequests",function(err,result){
        if(result !== null){
            console.log("Sending product result from redis");
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `productdetails` WHERE flag = 0";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getAddProductRequests",JSON.stringify(result),function(err,ans){
                        client.expire("getAddProductRequests", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.put('/addProduct', function (req, res) {
    //Update Query
    var query = "UPDATE productdetails SET flag = 1 where productid = '" + req.body.productid + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getProducts"],["del","getAddProductRequests"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.delete('/deleteProduct', function (req, res) {
    //Update Query
    var query = "DELETE FROM productdetails where productid = '" + req.query.data + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getProducts"],["del","getAddProductRequests"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

//Customer Requests

router.get('/getCustomers',function(req,res,next){
    client.get("getCustomers",function(err,result){
        if(result !== null){
            console.log("Sending customer result from redis");
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `customerdetails` WHERE flag <> 0";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getCustomers",JSON.stringify(result),function(err,ans){
                        client.expire("getCustomers", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.get('/getAddCustomerRequests',function(req,res,next){
    client.get("getAddCustomerRequests",function(err,result){
        if(result !== null){
            console.log("Sending customer result from redis");
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `customerdetails` WHERE flag = 0";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getAddCustomerRequests",JSON.stringify(result),function(err,ans){
                        client.expire("getAddCustomerRequests", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.put('/addCustomer', function (req, res) {
    //Update Query
    var query = "UPDATE customerdetails SET flag = 1 where customerid = '" + req.body.customerid + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getCustomers"],["del","getAddCustomerRequests"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.delete('/deleteCustomer', function (req, res) {
    //Update Query
    var query = "DELETE FROM customerdetails where customerid = '" + req.query.data + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getCustomers"],["del","getAddCustomerRequests"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});
//Drivers Request

router.get('/getDrivers',function(req,res,next){
    client.get("getDrivers",function(err,result){
        if(result !== null){
            console.log("Sending driver result from redis");
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `driverdetails`";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getDrivers",JSON.stringify(result),function(err,ans){
                        client.expire("getDrivers", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.post('/addDriver', function (req, res) {
    //Add Query
    var query = "INSERT INTO `driverdetails` " +
        "(`driverid`, `firstname`, `lastname`, `address`, `city`," +
        " `state`, `zipcode`, `email`, `phonenumber`) VALUES " +
        "('" + req.body.driverid + "', '" + req.body.firstname + "', '" + req.body.lastname + "', '" + req.body.address + "', " +
        "'" + req.body.city + "', '" + req.body.state + "', '" + req.body.zipcode + "', '" + req.body.email + "', '" + req.body.phonenumber + "');";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getDrivers"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.get('/editDriver', function (req, res, next) {
    var query = "SELECT * FROM `driverdetails` where driverid = '" + req.query.data + "';";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getDrivers"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.put('/updateDriver',function(req,res,next){
    var query = "UPDATE `driverdetails` SET `driverid` = '"+req.body.driverid+"', `firstname` = '"+req.body.firstname+"'," +
        " `lastname` = '"+req.body.lastname+"', `address` = '"+req.body.address+"', `city` = '"+req.body.city+"', `state` = '"+req.body.state+"'," +
        " `zipcode` = '"+req.body.zipcode+"', `email` = '"+req.body.email+"', `phonenumber` = '"+req.body.phonenumber+"'" +
        " WHERE `driverdetails`.`driverid` = '"+req.body.CurrentDriverId+"';"
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            client.multi([["del","getDrivers"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.delete('/deleteDriver',function(req,res,next){
    var query = "DELETE FROM driverdetails where driverid = '" +req.query.data+ "'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            client.multi([["del","getDrivers"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});
//Bill Requests

router.get('/getBills',function(req,res){

    client.get("getBills",function(err,result){
        if(result !== null){
            console.log("Sending bills result from redis");
            res.send(result);
        }
        else{
            var query = "SELECT * FROM `billdetails`";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getBills",JSON.stringify(result),function(err,ans){
                        client.expire("getBills", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

//Trip Requests

router.get('/getTrips',function(req,res){
    var query = "SELECT * FROM tripdetails";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});
//Truck Requests

router.get('/getTrucks',function(req,res){

    client.get("getTrucks",function(err,result){
        if(result !== null){
            console.log("Sending truck result from redis");
            res.send(result);
        }
        else{
            var query = "SELECT * FROM truckdetails";
            connection.query(query,function(err,result){
                if(err){
                    throw err;
                }
                else{
                    console.log("Storing result in redis");
                    client.set("getTrucks",JSON.stringify(result),function(err,ans){
                        client.expire("getTrucks", 180, function(err,didSetExpire){
                            console.log("Expired");
                        });
                        res.send(result);
                    });
                }
            })
        }
    });
});

router.post('/addTruck',function(req,res){
    var query = "INSERT INTO `truckdetails` (`truckid`, `truckinfo`, `driverid`)" +
        "VALUES ('"+req.body.truckid+"', '"+req.body.truckinfo+"', '"+req.body.driverid+"');";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            client.multi([["del","getTrucks"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
            //res.send(200);
        }
    });
});

router.get('/editTruck',function(req,res){
    var query = "SELECT * from `truckdetails` where truckid = '"+req.query.data+"';" ;
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.put('/updateTruck',function(req,res){

    var query = "UPDATE `truckdetails` SET `truckid` = '" + req.body.truckid + "', `truckinfo` = '"+ req.body.truckinfo+"'," +
        " `driverid` = '" + req.body.driverid + "' WHERE `truckdetails`.`truckid` = " + req.body.CurrentTruckId + ";";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            client.multi([["del","getTrucks"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.delete('/deleteTruck', function (req, res) {
    var query = "DELETE FROM truckdetails where truckid = '" + req.query.data + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else{
            client.multi([["del","getTrucks"]]).exec(function(err,result){
                console.log("Keys deleted forcefully");
                res.send(200);
            });
        }
    });
});

router.get('/getRevenue',function(req,res){
    var date = req.query.data.split("T")[0];
    var query = "Select SUM(total) as total from billdetails where billdate LIKE '" +date+ "%'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/getTrips',function(req,res){
    var data = req.query.data;
    console.log(typeof data);
    res.send(200);
    //var query = "Select SUM(total) as total from billdetails where billdate LIKE '" +date+ "%'";
    //connection.query(query,function(err,result){
    //    if(err){
    //        throw err;
    //    }
    //    else{
    //        res.send(result);
    //    }
    //});
});

router.get('/revenuePerDay',function(req,res){
    var query = "SELECT tripdetails.dropoffzip,AVG(billdetails.total) AS revenuePerDay FROM tripdetails "+
        "INNER JOIN billdetails "+
        "ON tripdetails.billid2=billdetails.billid "+
        "GROUP BY dropoffzip";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/totalDelivery',function(req,res){
    var query = "SELECT dropoffzip,COUNT(tripid) AS total from tripdetails GROUP BY dropoffzip";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/totalDelivery',function(req,res){
    var query = "SELECT dropoffzip,COUNT(tripid) AS total from tripdetails GROUP BY dropoffzip";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            console.log(result);
            console.log(result[0].productname);
            console.log(JSON.stringify(result));
            res.send(result);
        }
    });
});

router.get('/pick-dropLocation',function(req,res){
    var query = "SELECT pickuploc,dropoffloc FROM tripdetails";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/ridesPerDriver',function(req,res){
    //res.send(200);
    var query = "SELECT driverid2, COUNT(*) as trips FROM `tripdetails` GROUP BY driverid2";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        console.log("FIle Object :"+file);
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length -1]);
    }
});

var upload = multer({
    storage: storage
}).single('file');

router.post('/upload',function(req,res){


    upload(req,res,function(err){
        console.log("here");
        if(err){
            res.json({error_code:1,err_desc:err});
        }
        console.log(storage.getFilename);
        res.json({error_code:0,err_desc:null});
    });

    //console.log(req);
    //res.send(200);
});


router.get('/getFarmerProducts',function(req,res,next){
    console.log("fetching farmers products");
    productsCollection.find({farmerid: "111-11-1111", active: "Y"}).toArray(function (err, data) {
        if (data) {
            //console.log(data);
            res.send(data);
        }
    });

});



router.post('/createProduct',function(req,res,next){

    console.log("in create prod");
    var document = {
        farmerid: "111-11-1111",
        //productid: "",
        productname: req.body.productname,
        productprice: req.body.price,
        description: req.body.description,
        category: req.body.category,
        active: 'Y',
        approved: 'N',
        productimage: "",
        productreviews: [],
        productrating: ""
    };
    var productdetail = mongoseconnection.model('productdetail', productSchema);
    productdetail.nextCount(function (err, count) {


        var product = new productdetail(document);
        product.save(function (doc) {


            product.nextCount(function (err, count) {
                console.log(count);
                if (count > 0)
                    res.send("Success");
                else
                    res.send("Failure");

            });
        });
    });

});

router.get('/getFarmerProfile',function(req,res,next){
    console.log("fetching farmers profile info");
    var query = "select * from farmerdetails where farmerid='111-11-1111';";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })
});

router.get('/getEditProduct', function (req, res, next) {
    console.log("getEditProduct" + req.query.data);
    
    productsCollection.findOne({productid: Number(req.query.data)},
        function (err, user) {
            if (user) {
                res.send(user);
            }
            else {
                res.send("Failure");
            }
        });
});


router.put('/deactivateProduct', function (req, res, next) {
    console.log("in deactivateProduct");
    console.log(req);
    console.log(req.body.params.productid);

    productsCollection.update({productid: req.body.params.productid}, {$set: {active: 'N'}},
        function (err, upd) {
            if (upd) {
                console.log("product deactivated");
                res.send("success");
            }
        });
});

router.post('/updateProduct',function(req,res,next){
    console.log("edit product");
    //  console.log(req.body.productname + req.body.productprice + req.body.productdescription + req.body.productid);
    productsCollection.update({productid: req.body.productid}, {
            $set: {
                productname: req.body.productname,
                productprice: req.body.productprice,
                description: req.body.productdescription
            }
        },
        function (err, upd) {
            if (upd) {
                //console.log("product updated"+upd);
                res.send("success");
            }
        });
});

router.put('/editFarmerProfile',function(req,res,next){
    console.log("edit farmer profile");

    //console.log(req.body.editFirstname);

    var query = "UPDATE farmerdetails SET firstname='" + req.body.editFirstname + "', lastname='" + req.body.editLastname + "', email='" + req.body.editEmail + "',address='" + req.body.editAddress + "',city='" + req.body.editCity + "', state='" + req.body.editState + "', zipcode='" + req.body.editZipcode + "',password='" + req.body.editPassword + "', phonenumber='" + req.body.editPhonenumber + "' where farmerid='" + req.body.editFarmerID + "'";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            //  console.log("update:"+JSON.stringify(result));
            res.send("Success");
        }
    })
});

router.post('/checkCustomerLogin', function (req, res, next) {
    console.log("In checkCustomerLogin function");
    var password, email;
    password = req.body.password;
    //password = crypto.createHash("sha1").update(password).digest("HEX");
    email = req.body.email;

    var json_responses;

    var getUser = "select * from customerdetails where email='" + email + "' and password='" + password + "' and flag=1";
    console.log("Query for Login is:" + getUser);


    connection.query(getUser, function (err, results) {
        if (err) {
            throw err;
        }
        else if (results.length > 0) {
            var rows = results;
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            console.log("Results: "+(rows[0].firstname));
            console.log("Results: "+(rows[0].customerid));
            req.session.username = rows[0].customerid;
             cartid = req.session.username;
            console.log("Session initialized for '"+req.session.username+"' user");
            json_responses = {"statusCode" : "validLogin"};
            res.send(json_responses);
        } else {
            console.log("In else part of customer login");
            json_responses = {"statusCode" : "invalidLogin"};
            res.send(json_responses);
        }
    });

    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('carts');

        coll.findOne({cartid: "111-11-1111"}, function(err, result){
            if (result) {
                console.log(" collection id present");

            } else {
                coll.insert({cartid: cartid, products: []}, function (err, result) {
                    if (result) {
                        console.log(result);
                    }
                    else {
                        console.log("returned false");
                    }
                })
            }
        });
    });


});

router.post('/checkFarmerLogin', function (req, res, next) {
    var password, email;
    password = req.body.password;
    //password = crypto.createHash("sha1").update(password).digest("HEX");
    email = req.body.email;

    var json_responses;

    var getUser = "select * from farmerdetails where email='" + email + "' and password='" + password + "' and flag=1";
    console.log("Query for Login is:" + getUser);


    connection.query(getUser, function (err, results) {
        if (err) {
            throw err;
        }
        else if (results.length > 0) {
            var rows = results;
            var jsonString = JSON.stringify(results);
            var jsonParse = JSON.parse(jsonString);
            //console.log("Results: " + (rows[0].firstname));
            //  req.session.username = rows[0].firstname;
            //console.log("Session initialized for '"+req.session.username+"' user");
            json_responses = {"statusCode": "validLogin"};
            res.send(json_responses);
        } else {
            json_responses = {"statusCode": "invalidLogin"};
            res.send(json_responses);
        }
    });
});

router.get('/getProductInfo', function (req, res, next) {
    console.log("In getProductInfo -> api.js");
    var productId = req.query.productid;
    //console.log(productId);

    productsCollection.findOne({productid: Number(productId)}, function (err, data) {
        if (data) {
            //console.log(data);
            res.send(data);
        }
    });
});

router.post('/addProductReview', function (req, res, next) {
    console.log("In addProductReview -> api.js");

    var productId = req.body.params.productid;
    var rstars = req.body.params.rstars;
    var rbody = req.body.params.rbody;
    var rauthor = req.body.params.rauthor;
    var reviewDocument = {stars: rstars, body: rbody, contact: rauthor};
    //console.log(productId);
    //console.log(reviewDocument);


    //tweetsCollection.update({username:req.session.username},{$push:{tweets:{$each:[tDocument],$position:0}}},function(err,tdoc)
    productsCollection.update({productid: productId}, {
        $push: {
            productreviews: {
                $each: [reviewDocument],
                $position: 0
            }
        }
    }, function (err, data) {
        if (data) {
            productsCollection.findOne({productid: productId},
                function (err, result) {
                    if (result) {
                        var sum = 0, totalRating;
                        var reviews = result.productreviews;
                        for (i = 0; i < reviews.length; i++) {

                            sum = sum + Number(reviews[i].stars); // OR Number(reviews[i].starts)

                        }
                        totalrating = sum / reviews.length;
                        totalrating = (totalrating * 20) + "%";
                        console.log("totalrating: " + totalrating);

                        productsCollection.update({productid: productId}, {$set: {productrating: totalrating}},
                            function (err, upd) {
                                if (upd) {
                                    res.send("success");
                                }


                                else {
                                    res.send("Failure");
                                }

                            });
                    }
                });
        }
    });
});


router.post('/createCustomer', function (req, res, next) {
    console.log("Inside createCustomer -> api.js");
    var customerid, firstname, lastname, address, city, state, zipcode, phonenumber, email, ccnumber, password;

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    email = req.body.email;
    password = req.body.password;
    customerid = req.body.customerid;
    address = req.body.address;
    city = req.body.city;
    state = req.body.state;
    zipcode = req.body.zipcode;
    phonenumber = req.body.phonenumber;
    ccnumber = req.body.ccnumber;
    var json_responses;
    var getUser = "select * from customerdetails where customerid='" + customerid + "' or email='" + email +"'";
    console.log("getUser-customer query is:" + getUser);

    connection.query(getUser, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            if (results.length > 0) {
                console.log("Customer Exists");
                json_responses = {"statusCode": "customerExists"};
                res.send(json_responses);
            }
            else {
                var addCustomer = "INSERT INTO customerdetails (customerid, firstname, lastname, address, city, state, zipcode, phonenumber, email, ccnumber, password, flag) values ('" + customerid + "','" + firstname + "','" + lastname + "','" + address + "','" + city + "','" + state + "','" + zipcode + "','" + phonenumber + "','" + email + "','" + ccnumber + "','" + password + "','0')";
                console.log("addCustomer Query is:" + addCustomer);
                connection.query(addCustomer, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Customer created");
                        json_responses = {"statusCode": "customerCreated"};
                        res.send(json_responses);
                    }
                });
            }
        }
    })
});

router.post('/createFarmer', function (req, res, next) {
    console.log("Inside createFarmer -> api.js");
    var farmerid, firstname, lastname, address, city, state, zipcode, phonenumber, email, password;

    firstname = req.body.firstname;
    lastname = req.body.lastname;
    email = req.body.email;
    password = req.body.password;
    farmerid = req.body.farmerid;
    address = req.body.address;
    city = req.body.city;
    state = req.body.state;
    zipcode = req.body.zipcode;
    phonenumber = req.body.phonenumber;
    var json_responses;
    //console.log(req);
    var getUser = "select * from farmerdetails where farmerid='" + farmerid + "' or email='" + email +"'";
    console.log("getUser-farmer query is:" + getUser);

    connection.query(getUser, function (err, results) {
        if (err) {
            throw err;
        }
        else {
            if (results.length > 0) {
                console.log("Farmer Exists");
                json_responses = {"statusCode": "farmerExists"};
                res.send(json_responses);
            }
            else {
                var addFarmer = "INSERT INTO farmerdetails (farmerid, firstname, lastname, address, city, state, zipcode, phonenumber, email, password, flag) values ('" + farmerid + "','" + firstname + "','" + lastname + "','" + address + "','" + city + "','" + state + "','" + zipcode + "','" + phonenumber + "','" + email + "','" + password + "','0')";
                console.log(" add Query is:" + addFarmer);
                connection.query(addFarmer, function (err, result) {
                    if (err) {
                        throw err;
                    }
                    else {
                        console.log("Farmer created");
                        json_responses = {"statusCode": "farmerCreated"};
                        res.send(json_responses);
                    }
                });
            }
        }
    })
});
var fakeData = require('../fakeProductData.js');
router.get('/generateData',function(req,res){
    //var fakedata = data;
    for(var object in fakeData){
        productsCollection.insert(fakeData[object],function(err,result){
           if(object == fakeData.length){
               res.send(200);
           }
        });
    }
    //res.send(200);
});
module.exports = router;