var bandArray = ["My Bloody Valentine Band", "Paramore", "Slowdive", "Galaxie 500", "The Smiths", "The Sounds"];

function displayBandgifs() {

	var band = $(this).attr("data-band");
	var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + band + "&limit=10&api_key=dc6zaTOxFJmzC";
	console.log(queryURL);
	$.ajax({
 	url: queryURL,
 	method: "GET",
	}).done(function(response) {
	
		var bandsDiv = $("<div class='band'>");
		var gifRating = response.data.rating;
		var p1 = $("<p>").text("Rating: " + gifRating)
		bandsDiv.append(p1);

		var gifURL = response.image_original_url;
		console.log(gifURL)

		var gif = $("<img>").attr("src", gifURL)
		bandsDiv.append(gif);
		$("#gifs-view").prepend(bandsDiv);

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

	//calling function again to display the inital buttons
	renderButtons();

//ON CLICK: PAUSE/ANIMATE GIFS//