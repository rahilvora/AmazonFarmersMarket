var express = require('express');
var router = express.Router();

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
