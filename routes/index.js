var mongoose = require('mongoose');
var path = require('path');
var Twote = require('./../models/twote.js');
var TwoteUser = require('./../models/twoteUser.js');

var index = {};

index.home = function(req, res){
	

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

};

index.login = function(req, res){
	res.render("login");
};

index.loginUser = function(req, res){
	userName = req.body.name;
	console.log("username", req.body);
	console.log("username", userName);

	var newTwoteUser = new TwoteUser({
		userName: userName
	});
	newTwoteUser.save(function(err){
		if(err){
			console.log("Login did not work",err);
		}
		res.json(newTwoteUser);
	});
	
	// return res.redirect("/");
};

index.addTwote = function(req, res){

	var twote = req.body.twote;
	var postTime = formatDate(new Date());
	var newTwote = new Twote({
		author: "this",
		authorId: "aefasdf",
		message: twote,
		postTime: postTime 
	});
	Twote.save(function(err){
		if(err){
			console.log("adding new twote did not work",err);
		}
		res.json(newTwoteUser);
	});
};

var formatDate = function(date){

	
    var curr_date = date.getDate();
    var curr_month = date.getMonth() + 1; //Months are zero based
    var curr_year = date.getFullYear();
    var hours = date.getHours();
  	var minutes = date.getMinutes();
    return (curr_date + "-" + curr_month + "-" + curr_year + " "+ hours + ":"+ minutes);
}

module.exports = index;