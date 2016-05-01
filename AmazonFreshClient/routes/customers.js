var express = require('express');
var router = express.Router();
var connection = require('../MySQLConfig.js');

var mongo = require('../MongoConfig.js');

var mongoURL = "mongodb://localhost:27017/amazonfresh";
var productsCollection;

module.exports = router;