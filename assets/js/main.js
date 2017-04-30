$( document ).ready(function() {

var bandArray = ["My Bloody Valentine Band", "Paramore", "Slowdive", "Galaxie 500", "The Smiths", "The Sounds"];

function displayBandgifs() {

	var band = $(this).attr("data-band");
	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + band + "&api_key=dc6zaTOxFJmzC&limit=10";
	console.log(queryURL);
	$.ajax({
 	url: queryURL,
 	method: "GET",
	}).done(function(response) {
	console.log(response);
	$("#gifs-view").empty(); // erasing anything in this div id so that it doesnt keep any from the previous click
    var results = response.data; //shows results of gifs
    for (var i=0; i<results.length; i++){

	var bandDiv = $("<div>");
	bandDiv.addClass("bandDiv")
	var rating = $('<p>').text('Rating: ' + results[i].rating);
	bandDiv.append(rating);


	var gifURL = $("<img>");
	gifURL.attr("src", results[i].images.fixed_height_small_still.url); // still image stored into src of image
    gifURL.attr("data-still",results[i].images.fixed_height_small_still.url); // still image
    gifURL.attr("data-animate",results[i].images.fixed_height_small.url); // animated image
    gifURL.attr("data-state", "still"); // set the image state
    gifURL.addClass("image");
    bandDiv.prepend(gifURL);
    // pulling still image of gif
    // adding div of gifs to gifsView div
    $("#gifs-view").prepend(bandDiv);
}
		
	});

//append the value of the add an animal/submit val into the topicsArray and append a button linked to the gif call

}

function renderButtons() {
	
	$("#buttons-view").empty();

	for (var i = 0; i < bandArray.length; i++) {
		var b = $("<button>");
		b.addClass("band");
		b.attr("data-band", bandArray[i]);
		b.text(bandArray[i]);
		$("#buttons-view").append(b);

	}
}

//This funtion handles events where the band button is clicked
$("#addBand").on("click", function(event) {
	event.preventDefault();
	var band = $("#band-input").val().trim();

	//adds bands from textbox into the array
	bandArray.push(band);

	//calls the function to process bandArray
	renderButtons();
});

	
	$(document).on("click", ".band", displayBandgifs);
	renderButtons();

	 $(document).on("click", ".image", function(){
    var state = $(this).attr('data-state');
    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
    }
});
});