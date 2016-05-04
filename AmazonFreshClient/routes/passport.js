var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var mongo = require('./db/mongo');
var connection = require('../MySQLConfig.js');

module.exports = function (passport) {

    passport.use('checkCustomerLogin', new LocalStrategy(function (username, password, done) {

        console.log(username + " " + password);

        connection.query("SELECT * FROM `customerdetails` WHERE `email` = '" + username + "' and flag=1", function (err, rows) {
            console.log("retrieved the foll rows:" + JSON.stringify(rows));
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false);
            }

            // if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false);

            // all is well, return successful user
            return done(null, rows[0]);
        });
    }));

    passport.use('checkFarmerLogin', new LocalStrategy(function (username, password, done) {

        console.log(username + " " + password);

        connection.query("SELECT * FROM `farmerdetails` WHERE `email` = '" + username + "' and flag=1", function (err, rows) {
            console.log("retrieved the foll rows:" + JSON.stringify(rows));
            if (err)
                return done(err);
            if (!rows.length) {
                return done(null, false);
            }

            // if the user is found but the password is wrong
            if (!( rows[0].password == password))
                return done(null, false);

            // all is well, return successful user
            return done(null, rows[0]);
        });
    }));
}


