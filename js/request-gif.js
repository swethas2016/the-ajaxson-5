

$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(output); // in other words, when the form is submitted, fetchAndDisplayGif() will be executed
});

function output(event){
    event.preventDefault();
    var robotQuery = $("#robot-number").val();
    console.log("value", robotQuery);

    if (robotQuery == "5" || robotQuery == "five"){
         console.log(robotQuery);
        // $("#form-gif-request").submit(fetchAndDisplayGif);
        var searchQuery = $("#pic").val();
        if (searchQuery == ""){
            $(".error").text("No pics for you!");
        }
        else{
            fetchAndDisplayGif(searchQuery);
        }

    }
    else {
        $("#gif").attr('src', "");
      $(".error").text("No gifs for you!");
    }
}
/**
 * sends an asynchronous request to Giphy.com aksing for a random GIF using the
 * user's search term (along with "jackson 5")
 *
 * upon receiving a response from Giphy, updates the DOM to display the new GIF
 */
function fetchAndDisplayGif(searchQuery) {

    // This prevents the form submission from doing what it normally does: send a request (which would cause our page to refresh).
    // Because we will be making our own AJAX request, we dont need to send a normal request and we definitely don't want the page to refresh.
    event.preventDefault();

    // get the user's input text from the DOM
    // var searchQuery = $("#pic").val(); // TODO should be e.g. "dance"
    console.log("image", searchQuery);
    // configure a few parameters to attach to our request
    var params = {
        api_key: "dc6zaTOxFJmzC",
        tag : "jackson, 5, searchQuery" // TODO should be e.g. "jackson 5 dance"
        // tag: searchQuery
        };

    // make an ajax request for a random GIF
    $.ajax({
        url: "https://api.giphy.com/v1/gifs/random", // TODO where should this request be sent?
        data: params, // attach those extra parameters onto the request
        success: function(response) {
            // if the response comes back successfully, the code in here will execute.

            // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
            console.log("we received a response!");
            console.log(response);

            // TODO
            // 1. set the source attribute of our image to the image_url of the GIF
            // 2. hide the feedback message and display the image
            //originalImg = $(element).find('.ProductImage a img').attr('src');
            // $("#gif").attr('src') = response.image_url;
            // var displayImage = $("form-gif-request").find(image);
            $("#gif").attr('src', response.data.image_url);
            setGifLoadedStatus(true);

        },
        error: function() {
            // if something went wrong, the code in here will execute instead of the success function

            // give the user an error message
            $("#feedback").text("Sorry, could not load GIF. Try again!");
            setGifLoadedStatus(false);
        }
    });

    // TODO
    // give the user a "Loading..." message while they wait
    $("#feedback").attr("hidden", false);
    $("#feedack").text("Loading...");
    setGifLoadedStatus(false);
}

/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}

// function validate(robotQuery) {
//     if (robotQuery == 5){
//         fetchAndDisplayGif(event)
//     }
//     else {
//       $("#form-robot-request").text("No gifs for you!");
//     }
// }

// $(document).ready(function(){
//
// 	var robot = $("#form-robot-request").val();
//
// 	if (robot == 5) {
//         console.log("hi");
// 		fetchAndDisplayGif(event);
// 	}
// 	else {
// 		$(".error").text("No gifs for you.");
// 	}
//
// });
// $(document).ready(function() {
//     $(''#form-gif-request").submit("Hello there!");
// });
