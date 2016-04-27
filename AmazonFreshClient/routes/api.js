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
    /*var query = "select * from productdetails p, farmerdetails f   where p.farmerid=f.farmerid and f.farmerid='111-11-1111';";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })
    */

    productsCollection.find({}).toArray(function (err,data) {
        if(data){
            console.log(data);
            res.send(data);
        }
    });

});

router.post('/createProduct',function(req,res,next){

   console.log(req.body.price);

   var query = "INSERT INTO `amazonfresh`.`productdetails` (`farmerid`, `productname`, `productprice`, `description`) VALUES ('111-11-1111', '"+req.body.productname+"', '"+req.body.price+"', '"+req.body.description+"')";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            console.log("result of insert  "+result);
            res.send("Success");
        }
    })


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

router.get('/getEditProduct',function(req,res,next){
    console.log(req.query.data);
    
    var query = "select * from productdetails where farmerid='111-11-1111' and productid="+req.query.data+";";
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
    })
});

router.post('/updateProduct',function(req,res,next){
    console.log("edit product");
    console.log(req.body.productname + req.body.productprice + req.body.productdescription + req.body.productid);
    var query = "UPDATE `productdetails` SET `farmerid`='111-11-1111', `productname`='"+req.body.productname+"', `productprice`='"+req.body.productprice+"', `description`='"+req.body.productdescription+"' WHERE `productid`='"+req.body.productid+"';";
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send("Success");
        }
    })
});

router.put('/editFarmerProfile',function(req,res,next){
    console.log("edit farmer profile");

    console.log(req.body.editFirstname);

    /* var query = "UPDATE farmerdetails SET firstname='"+req.body.firstname+"', lastname='"+req.body.lastname+"', email='"+req.body.email+"',address='"+req.body.address+"',city='"+req.body.city+"', state='"+req.body.state+"', zipcode='"+req.body.zipcode+"',password='"+req.body.password+"', phonenumber='"+req.body.phonenumber+"' where farmerid='"+req.body.farmerid+"'";;
    connection.query(query,function(err,result){
        if(err){
            throw err;
        }
        else{
            res.send(result);
        }
    })*/
});


module.exports = router;