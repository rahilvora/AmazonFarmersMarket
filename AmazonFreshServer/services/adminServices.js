/**
 * Created by rahilvora on 01/05/16.
 */
var connection = require('../MySQLConfig.js');
var mongo = require('../MongoConfig.js');
var mongoURL = "mongodb://localhost:27017/amazonfresh";
var productsCollection;

mongo.connect(mongoURL, function () {
    console.log('Connected to mongo at: ' + mongoURL);
    productsCollection = mongo.collection('productdetails');
});

connection.connect(function (err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

function getFarmers(msg,callback){
    console.log("Rabbitmq server side");
    var query = "SELECT * FROM `farmerdetails` WHERE flag <> " + msg.value +";";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            callback(err,result);
        }
    })
}

function getCustomers(msg,callback){
    console.log("Rabbitmq server side");
    var query = "SELECT * FROM `customerdetails` WHERE flag <>" + msg.value +";";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            callback(err,result);
        }
    })
}

function getBills(msg,callback){
    console.log("Rabbitmq server side");
    var query = "SELECT * FROM `billdetails`";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            callback(err,result);
        }
    })
}
function getDriver(msg,callback){
    console.log("Rabbitmq server side");
    var query = "SELECT * FROM `driverdetails`";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            callback(err,result);
        }
    })
}

function getTrips(msg,callback){
    console.log("Rabbitmq server side");
    var query = "SELECT * FROM tripdetails";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            callback(err,result);
        }
    })
}

function getTrucks(msg,callback){
    console.log("Rabbitmq server side");
    var query = "SELECT * FROM truckdetails";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            callback(err,result);
        }
    })
}

exports.getFarmers = getFarmers;
exports.getCustomers = getCustomers;
exports.getBills = getBills;
exports.getDriver = getDriver;
exports.getTrips = getTrips;
exports.getTrucks = getTrucks;

