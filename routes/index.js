var mongoose = require('mongoose');
var path = require('path');
var Twote = require('./../models/twote.js');
var TwoteUser = require('./../models/twoteUser.js');

var index = {};

index.home = function(req, res){
	
	console.log("user id",req.session._id);
	console.log("author",req.session.name);

	// checking if user exists
	if(!req.session._id){
		res.redirect("login");
	}
	else{
		TwoteUser.find({}, null, {sort: {author: -1}},function(err1, data1){
			if(err1){
				console.log("error in looking for users", err1);
			}
			Twote.find({}, null, {sort: {postTime: -1}},  function(err2, data2){
				if(err2){
					console.log("error in looking for users", err2);
				}

				res.render("home", {
					twoteUser: data1,
					twote: data2
				});
			});
		})	
	}
};


index.login = function(req, res){
	if (req.session._id) {
	    res.redirect('home')
	} else {
	    res.render('login');
	}
}


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

index.logout = function(req, res){
	req.session.name = null;
	req.session._id = null;
	res.send("logout");
}
index.removeTwote = function(req, res){
	var authorId = req.session._id;
	console.log("in removing");
	console.log("authorId", authorId);
	console.log ("removed id",req.body.removeId)

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
				res.json("removed");
				return console.log("removed");

			});
		}
		return;
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

