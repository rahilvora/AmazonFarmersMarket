/**
 * Created by rahilvora on 21/04/16.
 */
var express = require('express');
var router = express.Router();
var connection = require('../MySQLConfig.js');
var drivers = [];

//Connecting to MySQL

connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});

//Farmer's Requests

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
    driver.push(req.body.driverid);

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

router.put('/editDriver',function(req,res,next){
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

router.get('/getFarmerProducts',function(req,res,next){
    console.log("fetching farmers products");
    var query = "select * from productdetails p, farmerdetails f   where p.farmerid=f.farmerid and f.farmerid='111-11-1111';";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })
});
module.exports = router;