

// loggin in users
$(".login").submit(function(event){
	event.preventDefault();
	// alert("button clicked");

	var username = $("#username").val();


	$.post("/loginUser", {
		"name":username
	})
	.done(function(data, status){
		console.log("data", data);
      	console.log("status", status);
      	// $("#userList").
	});

});

// adding twotes

$("#addingTwote").submit(function(event){
	event.preventDefault();
	twote = $("#twoteInput").val();
	console.log("twote", twote);

	$.post("/addingTwote", {
		"twote": twote,
		"authorID": "whoever"
	})
	.done(function(data, status){
		console.log("data", data);
      	console.log("status", status);
	});


});

$(".removeTwote").click(function(event){
	event.preventDefault();
	$.post("/removingTwote")
	.done(function(data, status){
		console.log("data", data);
      	console.log("status", status);
	});
});