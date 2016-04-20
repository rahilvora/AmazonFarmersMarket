
var ObjectId = require('mongodb').ObjectID;
var MongoClient = require('mongodb').MongoClient;

// Connection URL
var url = 'mongodb://localhost:27017/users';
// Use connect method to connect to the Server
var database;
var mongo = MongoClient.connect(url, function(err, db) {
	if(err) throw err;
	else{
		console.log('Connected to MongoDB.. YO!!!')
		database = db;
	}
});


function loggedIN(msg,callback){
	console.log("Services Login.js");
	var oScope = this;
	var collection = database.collection('userdata');
	console.log(msg);
	var data = {
		_id:msg._id,
		password:msg.password
	}
	collection.count(data,function(err,result){
		callback(err,result);
	});
}

function getTweet(msg,callback){
	var collection = database.collection('tweets');
	collection.aggregate([{
		$lookup:{
			from:"userdata",
			localField:"email",
			foreignField:"_id",
			as:"embeddedData"
		}
	}],function(err,result){
		callback(err,result);
	})
}

function getAllTweet(msg,callback){
	var collection = database.collection('following');
	var data = {
		email:msg.email
	}
	collection.find(data).toArray(function(err,result){
		var array = [];
		for(var a in result){
			array.push(result[a].following_email);
		}
		array.push(msg.email);
		var c = database.collection('tweets');
		var d = {
			email :{
				$in:array
			}
		}
		c.find(d).toArray(function(err,answer){
			callback(err,answer);
		});

	});

}

function getRetweet(msg,callback){
	var collection = database.collection('retweets');
	collection.aggregate([{
		$match:{
			p_id:msg.p_id
		}
	}],function(err,result){
		callback(err,result);
	})
}

function getFollowing(msg,callback){
	var collection = database.collection('following');
	collection.find({email:msg.email}).toArray(function(err,result){
		if(err){
			throw err;
		}
		else{
			callback(err,result);
		}
	});
}

function getFollower(msg,callback){
	var collection = database.collection('follower');
	collection.find({email:msg.email}).toArray(function(err,result){
		if(err){
			throw err;
		}
		else{
			callback(err,result);
		}
	});
}

function signUp(msg,callback){
	var  collection = database.collection('userdata');
	var data = {
	  _id:msg._id,
	  firstname:msg.firstname,
	  lastname:msg.lastname,
	  password:msg.password,
	  birthday:null,
	  thandle:null,
	  contact:null,
	  city:null,
	  country:null
	}
	collection.insert(data,function(err,result){
		callback(err,result);
	});
}

function addTweet(msg,callback){
	var  collection = database.collection('tweets');
	var data = {
		email: msg.email,
		tweet: msg.tweet,
		date:new Date(),
		retweetCount:0
	}
	collection.insert(data,function(err,result){
		callback(err,result);
	});
}

function addReTweet(msg,callback){
	var collection = database.collection('retweets');
	var data = {
		p_id:msg.p_id,
		retweet: msg.retweet,
		email: msg.email,
		date:new Date()
	}
	collection.insert(data,function(err,result){
		callback(err,result);
	});
}

function updateRetweetCount(msg,callback){
	var  collection = database.collection('tweets');
	collection.updateOne(
	    {_id:ObjectId(msg._id)},
	    {$inc:{
	      retweetCount:1
	      }
	    },function(err,result){
	      if(err){
	        throw err;
	      }
	      else{
	        callback(err,result);
	      }
		});
}

function addFollowing(msg,callback){
	var  collection = database.collection('following');
	var data = {
	 email: msg.email,
	 following_email: msg.following_email
	}
	collection.insert(data,function(err,result){
	 if(err){
	    throw err
	  }
	  else{
	      callback(err,result);
	    }
	  });
}

function editForm(msg,callback){
	var collection = database.collection('userdata');
	collection.update(
		{_id:msg._id},
		{$set:{
			firstname:msg.firstname,
			lastname:msg.lastname,
			birthday:msg.birthday,
			thandle:msg.thandle,
			contact:msg.contact,
			city:msg.city,
			country:msg.country
		}
		},function(err,result){
			if(err){
				throw err;
			}
			else{
				callback(err,result);
			}
		});
}

function getToFollow(msg,callback){
	var c = database.collection('following');
		var q = {email:msg.email}
		c.find(q).toArray(function(err,result){
		  var collection = database.collection('userdata');
		  var query = {_id:{$nin:result}}

		  collection.find(query).toArray(function(err,answer){
			if(err){
			  throw err;
			}
			else{
			  updatefollowList(answer,result,function(answer){
				callback(err,answer)
			  });

			}
		  });
		});
}

function updatefollowList(answer,result,callback){
	for(var a in answer){
		for(var b in result){
			if(answer[a]._id === result[b].following_email){
				answer.splice(a,1);
			}
		}
	}
	callback(answer);
}

exports.loggedIN = loggedIN;
exports.getTweet = getTweet;
exports.getAllTweet = getAllTweet;
exports.getRetweet = getRetweet;
exports.getFollowing = getFollowing;
exports.getFollower = getFollower;
exports.signUp = signUp;
exports.addTweet = addTweet;
exports.addReTweet = addReTweet;
exports.updateRetweetCount = updateRetweetCount;
exports.addFollowing = addFollowing;
exports.editForm = editForm;
exports.getToFollow = getToFollow;
