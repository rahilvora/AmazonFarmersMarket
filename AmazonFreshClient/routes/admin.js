var express = require('express');
var router = express.Router();

///* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('index', { title: 'Express' });
//});
//
//router.get('/admin', function(req, res, next) {
//    res.render('admin', { title: 'Express' });
//});
console.log("IN ADMIN");
router.get('/getFarmers',function(req,res,next){
    console.log("IN FARMERS");
    var query = "SELECT * FROM `farmerdetails` WHERE flag <> 0";
    res.render('adminViews/farmer/ListFarmers.ejs');
    //,{"name":"rahil","sexy":"male"});
});

module.exports = router;
