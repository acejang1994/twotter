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
      	$newDiv = $(".author").clone().first();
      	$newDiv.attr("id", data._id);
      	$newDiv.text(data.author);

      	$("#authorsList").append($newDiv);
	});

});

// adding twotes

$("#addingTwote").submit(function(event){
	event.preventDefault();
	twote = $("#twoteInput").val();
	console.log("twote", twote);

	$.post("/addingTwote", {
		"twote": twote,
	})
	.done(function(data, status){
		console.log("data", data);
      	console.log("status", status);
      	// $newDiv = $(".twotes").clone().first();
      	// $newDiv.attr("name", data._id);
      	// // $newDiv.text(data.author);
      	// debugger;

      	// $("#twoteslist").append($newDiv);


	});


});

$(".removeTwote").click(function(event){
	event.preventDefault();
	authorId = $(this).attr("id");
	$.post("/removingTwote")
	.done(function(data, status){
		console.log("data", data);
      	console.log("status", status);
	});
});

$(".author").click(function(event){
	event.preventDefault();
	authorId = $(this).attr("id");
	// alert(authorId);

	// $('[name='+authorId+']');
});