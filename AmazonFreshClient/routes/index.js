var express = require('express');
var router = express.Router();
//var connection = require('../MySQLConfig.js');
////farmer
///* GET home page. */
//connection.connect(function(err) {
//  if (err) {
//    console.error('error connecting: ' + err.stack);
//    return;
//  }
//  console.log('connected as id ' + connection.threadId);
//});
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/admin', function(req, res, next) {
  res.render('admin', { title: 'Express' });
});

router.get('/farmer', function(req, res, next) {
  res.render('farmer', { title: 'Farmer' });
});




module.exports = router;
