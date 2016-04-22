/**
 * Created by rahilvora on 21/04/16.
 */
var express = require('express');
var router = express.Router();

console.log("IN ROUTING");
///* GET home page. */
//router.get('/', function(req, res, next) {
//    res.render('index', { title: 'Express' });
//});
//
//router.get('/admin', function(req, res, next) {
//    res.render('admin', { title: 'Express' });
//});
var admin = require('../routes/admin.js');
router.use('/admin', admin);


module.exports = router;