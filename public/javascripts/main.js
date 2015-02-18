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
      	window.location.replace('/home');
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
		// $(".login").hide();
		// $("#logout").show();
      	
	});

});

// adding twotes

var addingTwote = function(){
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
	      	$newDiv.attr("name", data.authorId);
	      	$newDiv.find("div.authorNameInTwote").html("- " +data.author)
	      	$newDiv.find("span").html(data.message);
	      	
	      	$("#twoteslist").prepend($newDiv);
			// debugger
			$(".removeTwote").unbind();
			removeTwote();
		});
	});
}

addingTwote();


$("#logout").click(function(event){
	event.preventDefault();
	// alert("Logout");
	$.get("/logout");
	// $.post("/logout").done(function(err, data){
	// 	if(err){
	// 		console.log("error", err);
	// 	}
	// 	console.log("redirect",data.redirect);
	// 	// if (data.redirect){
 //        window.location.replace("/login");
 //    	// }
	// 	// $(".login").show();
	// 	// $("#logout").hide();
	// })
});



var removeTwote = function(){

	$("button.removeTwote").click(function(event){
		$("button.removeTwote").unbind();
		event.preventDefault();
		var $twote = $(event.target);
		var twoteId = $twote.attr('id')
		debugger;
		$.post("/removingTwote", {
			"removeId": twoteId
		}).done(function(data){
			// debugger;
			$twote.parent().remove();
			console.log("removed!!")
			// debugger;
		});
		// debugger;
	});
}
removeTwote();


$(".author").click(function(event){
	event.preventDefault();
	authorId = $(this).attr("id");
	// alert(authorId);
	// debugger;
	 // $(this).css({'color':'red'});
	 $(this).toggleClass("toggleAuthor");
	 // $.each($('[name='+authorId+']'),function(index, value){
	 // 	$(value).toggleClass("toggleTwote");

	 // });
	 $('[name='+authorId+']').toggleClass("toggleTwote");
	 // debugger;
});

