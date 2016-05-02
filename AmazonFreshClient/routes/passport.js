var passport = require("passport");
var LocalStrategy = require("passport-local").Strategy;
//var mongo = require('./db/mongo');
var connection = require('../MySQLConfig.js');
console.log("Coonection is : " + connection);
//var loginDatabase = "mongodb://localhost:27017/login";

/*connection.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return;
    }
    console.log('connected as id ' + connection.threadId);
});*/

module.exports = function(passport) {
	
	
	/* passport.use('login', new LocalStrategy(function(req, username, password, done) { 
		 // callback with email and password from our form
		 	console.log(username + password);
	         connection.query("SELECT * FROM `amazonfresh`.`customers` WHERE `email` = '" + username + "'",function(err,rows){
				console.log(rows);
	        	 if (err)
	                return done(err);
				 if (!rows.length) {
	                return done(null, false, req.flash('loginMessage', 'No user found.')); // req.flash is the way to set flashdata using connect-flash
	            } 
				
				// if the user is found but the password is wrong
	            if (!( rows[0].password == password))
	                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); // create the loginMessage and save it to session as flashdata
				
	            // all is well, return successful user
	            return done(null, rows[0]);			
			
			});
			


	    }));*/
    passport.use('login', new LocalStrategy({},function( username, password, done) {
    	
    	console.log(username +" "+password);

    	connection.query("SELECT * FROM `customerdetails` WHERE `email` = '" + username + "'",function(err,rows){
			console.log("error in passport" + err);
			console.log("retrieved the foll rows:" +rows);
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
		

      /*  mongo.connect(loginDatabase, function(connection) {

            var loginCollection = mongo.connectToCollection('login', connection);
            var whereParams = {
                username:username,
                password:password
            }

            process.nextTick(function(){
                loginCollection.findOne(whereParams, function(error, user) {

                    if(error) {
                        return done(err);
                    }

                    if(!user) {
                        return done(null, false);
                    }

                    if(user.password != password) {
                        done(null, false);
                    }

                    connection.close();
                    console.log(user.username);
                    done(null, user);
                });
            });
        });*/
    })); 
}


