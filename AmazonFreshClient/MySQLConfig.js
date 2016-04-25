/**
 * Created by rahilvora on 20/04/16.
 */
var mysql = require('mysql');

var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password:"balaji",
    database:"amazonfresh"
});

module.exports = connection;