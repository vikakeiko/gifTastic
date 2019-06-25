// create an array of topics
var topics = ['Cat', 'Dog'];

// Adding click event listener to all buttons
function buttonClicked(event) {
    // get input
    var input = $(event.target).text().trim();
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        input + "&api_key=BkaUZZWcFij6J7AoQj3WtPb1R2p9O6V9&limit=10";
    // make get request to giphy api
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        var item = response.data;

        // var btn = $("<button>").text(input);
        // $("#filterBtns").append(btn);

        $("#gifs-appear-here").empty();


        for (var i = 0; i < item.length; i++) {

            var displayDiv = $("<div>");
            var p = $("<p>");

            // Set the inner text of the paragraph to the rating of the image in item[i].
            p.text("Raitings: " + item[i].rating).css("color", 'red');

            var displayImg = $("<img>");
            // set the image's src to result[i]'s fixed_height.url.
            displayImg.attr("src", item[i].images.fixed_height.url);
            // append the p variable to the displayDiv variable
            displayDiv.append(p, displayImg);
            // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
            $('#gifs-appear-here').prepend(displayDiv);
        }



    });
    event.preventDefault();

}

$('form').submit(function (event) {
    event.preventDefault();

    input = $("#input").val().trim();
    topics.push(input);
    makeButtons();
});

//  make buttoms 
function makeButtons() {
    $('#filterBtns').empty();
    for (var i = 0; i < topics.length; i++) {
        var btn = $("<button>").text(topics[i]);
        $("#filterBtns").append(btn);
    }
    $('button').on('click', function (event) {
        buttonClicked(event);
    });
}

makeButtons();