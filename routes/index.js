var mongoose = require('mongoose');
var path = require('path');
var Twote = require('./../models/twote.js');
var TwoteUser = require('./../models/twoteUser.js');

var index = {};

index.home = function(req, res){
	
	console.log("user id",req.session._id);
	console.log("author",req.session.name);

	// checking if user exists
	// if(req.session._id == null){
		Twote.find({}, function(err, data){
		if(err){
			console.log("error in looking for users", err);
		}
		twotes = data;
		})

		TwoteUser.find({}, function(err, data){
			if(err){
				console.log("error in looking for users", err);
			}
			res.render("home", {
				twoteUser: data,
				twote: twotes
			});
		})	
	// }

	
	

};

index.loginUser = function(req, res){
	userName = req.body.name;
	
	console.log("username1", userName);

	TwoteUser.find({"userName": userName}, function(err, twoteUser){
		console.log("result of findby", twoteUser);
		// console.log("inside twote", twoteUser.length);
		if (twoteUser.length == 0){
			var newTwoteUser = new TwoteUser({
				userName: userName
			});
			newTwoteUser.save(function(err){
				if(err){
					console.log("Login did not work",err);
				}
			
				req.session.name = newTwoteUser.userName;
				req.session._id = newTwoteUser._id;
				res.json({
					"_id": req.session._id,
					"author": req.session.name
				});
		
			});
		}else{
			console.log("returning user", twoteUser);
			req.session.name = twoteUser[0].userName;
			req.session._id = twoteUser[0]._id;
			console.log("re user name", req.session.name);
			console.log("re user _id", req.session._id);
			res.json({
				"_id": req.session._id,
				"author": req.session.name
			});
		}

	});
};

index.addTwote = function(req, res){

	var twote = req.body.twote;
	var authorId = req.session._id;
	console.log("user id", authorId);
	var author = req.session.name;
	console.log("author name", authorId);
	var postTime = formatDate(new Date());
	var newTwote = new Twote({
		author: author,
		authorId: authorId,
		message: twote,
		postTime: postTime 
	});
	newTwote.save(function(err){
		if(err){
			console.log("adding new twote did not work",err);
		}
		res.json(newTwote);
	});
};

index.removeTwote = function(req, res){
	var authorId = req.session._id;
	console.log("in removing");
	console.log("authorId", authorId);

	Twote.findById(req.body.removeId, function(err, twote) {
		if (err){
			console.error('Error in finding the tweet', err);
		}
		console.log("twote", twote);

		if (twote.authorId == authorId) {
			twote.remove(function(err) {
				if (err){
					console.error('Error in removing twote ', err);
				}

				return console.log("removed");
			});
		}
		return
	});

};

var formatDate = function(date){
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var hours = date.getHours();
  	var minutes = date.getMinutes();
    return (curr_date + "-" + curr_month + "-" + curr_year + " "+ hours + ":"+ minutes);
};


module.exports = index;

