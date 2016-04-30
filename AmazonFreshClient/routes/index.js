var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('homepage');
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

router.get('/signUp',function (req,res,next) {
  res.render('loginAndSignUp/signUpForm');
})

module.exports = router;
