$(document).ready(function (){

// Initial array of cartoon characters
var topics = ["Mickey Mouse", "Homer Simpson", "Dennis the Menace", "Spider-Man"];

// display function re-renders the HTML to display the appropriate content
function displayCartoonCharacter() {

    //Empty the DIV for next detail
    $("#cartoons-view").empty(); 

    var cartoon = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + cartoon + "&api_key=7mYAA8CfHsF5g3bYU6T8ncE3Zao5S47f&limit=10";

    $.ajax({
        url: queryURL,
        method: "GET"
        }).then(function(response) {
            // After data comes back from the request            
            console.log(queryURL);

            console.log(response);
            // storing the data from the AJAX request in the results variable
            var results = response.data;

            // Looping through each result item
            for (var i = 0; i < results.length; i++) {

            // Creating and storing a div tag
            var cartoonDiv = $("<div>");

            // Creating a paragraph tag with the result item's rating
            var r = $("<p>").text("Rating: " + results[i].rating);

            // Creating a paragraph tag with the result item's title
            var t = $("<p>").text("Title: " + results[i].title);

            // Creating and storing an image tag
            var cartoonImage = $("<img>");

            // Setting attribute of the image to a property pulled off the result item
            cartoonImage.addClass("gif");
            cartoonImage.attr("src", results[i].images.fixed_height_still.url);
            cartoonImage.attr("data-state","still");
            cartoonImage.attr("data-animate",results[i].images.fixed_height.url);
            cartoonImage.attr("data-still", results[i].images.fixed_height_still.url);
            

            // Appending the paragraph and image tag to the cartoonDiv
            cartoonDiv.append(r);
            cartoonDiv.append(t);
            cartoonDiv.append(cartoonImage);

            // Prependng the cartoonDiv to the HTML page in the "#cartoons-view" div
            $("#cartoons-view").prepend(cartoonDiv);

        }

             //Make the cartoons move upon clicking on it!
             $(".gif").on("click", function() {
                var state = $(this).attr("data-state");
                console.log(this);
                // If the clicked image's state is still, update its src attribute to what its data-animate value is.
                // Then, set the image's data-state to animate
                // Else set src to the data-still value
                if (state === "still") {
                    $(this).attr("src", $(this).attr("data-animate"));
                    $(this).attr("data-state", "animate");
                } else {
                    $(this).attr("src", $(this).attr("data-still"));
                    $(this).attr("data-state", "still");
                }
              
            });

    });    
};

           

// Function for displaying gifs
function renderButtons() {

    // Deleting the buttons prior to adding new 
    // (this is necessary otherwise you will have repeat buttons)
    $("#buttons-view").empty();

    // Looping through the array
    for (var i = 0; i < topics.length; i++) {

        // Then dynamically generating buttons for each movie in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of cartoon to our button
        a.addClass("cartoon");
        // Adding the bootstrap button
        a.addClass("btn btn-primary");
        // Adding a data-attribute
        a.attr("data-name", topics[i]);
        // Providing the initial button text
        a.text(topics[i]);
        // Adding the button to the buttons-view div
        $("#buttons-view").append(a);
    }
};


// This function handles events where one button is clicked
$("#add-cartoon").on("click", function(event) {
    event.preventDefault();

    // This line grabs the input from the textbox
    var character = $("#cartoon-input").val().trim();

    // Adding the gif to our array
    topics.push(character);
    console.log(topics);

    // Calling renderButtons which handles the processing of our movie array
    renderButtons();
});

// Function for displaying the gif
$(document).on("click", ".cartoon", displayCartoonCharacter);

// Calling the renderButtons function to display the initial buttons
renderButtons();

});