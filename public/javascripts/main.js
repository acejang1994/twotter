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
      	var flag = false;
      	$newDiv = $(".author").clone().first();
      	$newDiv.attr("id", data._id);
      	$newDiv.text(data.author);
      	// debugger;
      	$.each($(".author"), function(index, value){
      		// console.log("value", value);
      		// debugger;
      		if(value.innerText == data.author){
      			flag = true;
      		}

      	});
      	if(!flag){
      		$("#authorsList").append($newDiv);
		}
		$(".login").hide();
		$("#logout").show();
      	
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
      	$newDiv = $(".twotes").clone().first();
      	$newDiv.attr("name", data._id);
      	$newDiv.find("div.authorNameInTwote").html("- " +data.author)
      	$newDiv.find("span").html(data.message);
      	// debugger;
      	$("#twoteslist").append($newDiv);

	});
});

$("#logout").click(function(event){
	event.preventDefault();
	alert("Logout");
	$.post("/logout").done(function(err){
		if(err){
			console.log(err);
		}
		$(".login").show();
		$("#logout").hide();
	})
	

});



var removeTwote = function(){
	$("button.removeTwote").click(function(event){
		event.preventDefault();
		var $twote = $(event.target);
		var twoteId = $twote.attr('id')
		$.post("/removingTwote", {
			"removeId": twoteId
		}).done(function(data){
			$twote.parent().remove();
			console.log("removed!!")
			debugger;
		});
		// debugger;
	});
}
removeTwote();


$(".author").click(function(event){
	event.preventDefault();
	authorId = $(this).attr("id");
	alert(authorId);


	// $('[name='+authorId+']');
});
