var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('Homepage');
});

router.get('/admin', function(req, res, next) {
  res.render('adminViews/admin');
});

router.get('/farmer', function(req, res, next) {
  res.render('farmerViews/farmer');
});

router.get('/login',function (req,res,next) {
  res.render('loginAndSignUp/login');
});

router.get('/customerSignUp',function (req,res,next) {
  res.render('loginAndSignUp/customerSignUp');
});

router.get('/farmerSignUp',function (req,res,next) {
  res.render('loginAndSignUp/farmerSignUp');
});

router.get('/customerHome',function(req,res,next){
  res.render('customerViews/customerHome');
});


module.exports = router;
