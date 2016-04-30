/**
 * Created by rahilvora on 21/04/16.
 */
var express = require('express');
var router = express.Router();
var connection = require('../MySQLConfig.js');
var mongo = require('../MongoConfig.js');
var drivers = [];

var mongoURL = "mongodb://localhost:27017/amazonfresh";
var productsCollection;

mongo.connect(mongoURL, function() {
    console.log('Connected to mongo at: ' + mongoURL);
    productsCollection = mongo.collection('productdetails');
});



//Connecting to MySQL

connection.connect(function(err) {
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
    var query = "SELECT * FROM `farmerdetails` WHERE flag <> 0";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })

});

router.get('/getAddFarmerRequests', function (req, res, next) {
    var query = "SELECT * FROM `farmerdetails` WHERE flag = 0";
    connection.query(query, function (err, result) {
        if (err) {
            throw err;
        }
        else {
            res.send(result);
        }
    })
});

router.put('/addFarmer',function(req,res){
    //Update Query
    var query = "UPDATE farmerdetails SET flag = 1 where farmerid = '" + req.body.farmerid +"'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });

});

router.delete('/deleteFarmer',function(req,res){
    //Update Query
    var query = "DELETE FROM farmerdetails where farmerid = '" +req.query.data+ "'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });

});

//Product Requests

router.get('/getProducts',function(req,res,next){
    var query = "SELECT * FROM `productdetails` WHERE flag <> 0";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/getAddProductRequests',function(req,res,next){
    var query = "SELECT * FROM `productdetails` WHERE flag = 0";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.put('/addProduct',function(req,res){
    //Update Query
    var query = "UPDATE productdetails SET flag = 1 where productid = '" + req.body.productid +"'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });
});

router.delete('/deleteProduct',function(req,res){
    //Update Query
    var query = "DELETE FROM productdetails where productid = '" +req.query.data+ "'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });
});

//Customer Requests

router.get('/getCustomers',function(req,res,next){
    var query = "SELECT * FROM `customerdetails` WHERE flag <> 0";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.get('/getAddCustomerRequests',function(req,res,next){
    var query = "SELECT * FROM `customerdetails` WHERE flag = 0";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.put('/addCustomer',function(req,res){
    //Update Query
    var query = "UPDATE customerdetails SET flag = 1 where customerid = '" + req.body.customerid +"'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });
});

router.delete('/deleteCustomer',function(req,res){
    //Update Query
    var query = "DELETE FROM customerdetails where customerid = '" +req.query.data+ "'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });
});
//Drivers Request

router.get('/getDrivers',function(req,res,next){
    var query = "SELECT * FROM `driverdetails`";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    });
});

router.post('/addDriver',function(req,res){
    //Add Query
    //driver.push(req.body.driverid);

    //for(var drivers in drivers){
    //    if(drivers[driver] == req.body.driverid){
    //        res.send(400);
    //    }
    //}
    var query = "INSERT INTO `driverdetails` " +
        "(`driverid`, `firstname`, `lastname`, `address`, `city`," +
        " `state`, `zipcode`, `email`, `phonenumber`) VALUES " +
        "('"+req.body.driverid+"', '"+req.body.firstname+"', '"+req.body.lastname+"', '"+req.body.address+"', " +
        "'"+req.body.city+"', '"+req.body.state+"', '"+req.body.zipcode+"', '"+req.body.email+"', '"+req.body.phonenumber+"');";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });
});

router.get('/editDriver',function(req,res,next){
    var query = "SELECT * FROM `driverdetails` where driverid = '"+req.query.data+"';";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
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
            res.send(result);
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
            res.send(200);
        }
    });
});
//Bill Requests

router.get('/getBills',function(req,res){
    var query = "SELECT * FROM `billdetails`";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
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
    var query = "SELECT * FROM truckdetails";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
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
            res.send(200);
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
            res.send(200);
        }
    });
});

router.delete('/deleteTruck',function(req,res){
    var query = "DELETE FROM truckdetails where truckid = '" +req.query.data+ "'";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(200);
        }
    });
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

    // console.log(req.body.editCity);

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
    console.log("In checkCustomerLogin function")
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
            console.log("In else part of customer login");
            json_responses = {"statusCode" : "invalidLogin"};
            res.send(json_responses);
        }
    });
});

router.post('/checkFarmerLogin', function (req, res, next) {
    var password, email;
    password = req.body.password;
    //password = crypto.createHash("sha1").update(password).digest("HEX");
    email = req.body.email;

    var json_responses;

    var getUser="select * from farmerdetails where email='"+email+"' and password='"+password+"';"
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