/**
 * Created by rahilvora on 21/04/16.
 */
var express = require('express');
var router = express.Router();
var connection = require('../MySQLConfig.js');
//farmer
/* GET home page. */
connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});
/* GET users listing. */
//router.get('/', function(req, res, next) {
//    res.send('respond with a resource');
//});

router.get('/getFarmers',function(req,res,next){
    var query = "SELECT * FROM `farmerdetails` WHERE flag <> 0";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })
    //res.send({"name":"rahil","sexy":"male"});
});

router.get('/getAddFarmerRequests',function(req,res,next){
    var query = "SELECT * FROM `farmerdetails` WHERE flag = 0";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })
    //res.send({"name":"rahil","sexy":"male"});
});

router.put('/addFarmer',function(req,res){
    //Update Query
    var query = ""

});

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
    //res.send({"name":"rahil","sexy":"male"});
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
    //res.send({"name":"rahil","sexy":"male"});
});

router.put('/addProduct',function(req,res){
    //Update Query
    var query = "";
    res.send(200);
});

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
    //res.send({"name":"rahil","sexy":"male"});
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
    //res.send({"name":"rahil","sexy":"male"});
});

router.put('/addCustomer',function(req,res){
    //Update Query
    var query = ""
});

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
    //res.send({"name":"rahil","sexy":"male"});
});

router.post('/addDriver',function(req,res){
    //Update Query
    var query = ""
    res.send(200);
});

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
    //res.send({"name":"rahil","sexy":"male"});
});

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
    //res.send({"name":"rahil","sexy":"male"});
    //res.send({"name":"rahil","sexy":"male"});
});

module.exports = router;