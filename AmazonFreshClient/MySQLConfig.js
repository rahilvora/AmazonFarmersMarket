/**
 * Created by rahilvora on 20/04/16.
 */
var mysql = require('mysql');
console.log("mysql:"+JSON.stringify(mysql));
var connection = mysql.createConnection({
    host : '127.0.0.1',
    user : 'root',
    password:"password1234",
    database:"amazonfresh"
});

module.exports = connection;