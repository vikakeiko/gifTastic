// create an array of topics
var topics = ['The Simpsons', 'Family Guy', 'Death Note', 'Pokemon', 'One Piece', 'Mickey Mouse', 'Tom & Jerry', 'Batman', 'Super Mario','Toy Story3', 'Minions',];

// Adding click event listener to all buttons
function buttonClicked(event) {
    event.preventDefault();

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

        // calling "item" for each data
        var item = response.data;
        console.log(item);

        $("#gifs-appear-here").empty();


        for (var i = 0; i < item.length; i++) {

            var displayDiv = $("<div>");
            displayDiv.addClass("gifs");
            var p = $("<p>");

            // Set the inner text of the paragraph to the rating of the image in item[i].
            p.text("Raitings: " + item[i].rating).css("color", 'gold');

            var displayImg = $("<img>");

            displayImg.attr("src", item[i].images.fixed_height_still.url);

            // initially, imgs are still
            displayImg.attr("data-state", "still");

            displayImg.attr("data-still", item[i].images.fixed_height_still.url)
            displayImg.attr("data-animate", item[i].images.fixed_height.url)

            // append the p variable to the displayDiv variable
            displayDiv.append(p, displayImg);
            // Prepend the animalDiv variable to the element with an id of gifs-appear-here.
            $('#gifs-appear-here').prepend(displayDiv);
        }
    });
}

// when the user submit, the funtction runs 
$('form').submit(function (event) {
    event.preventDefault();
    input = $("#input").val().trim();
    // console.log('input ' + input)
    if(!input || input === "" ) {
        return;
    }
    topics.push(input);
    makeButtons();
});

//  making buttoms 
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

// when the user clicks the images 
$("#gifs-appear-here").on("click", "img", function () {
    var state = $(this).attr("data-state");


    if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
    } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr('data-state', "still");
    }
})