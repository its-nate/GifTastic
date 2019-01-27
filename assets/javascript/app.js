$(document).ready(function () {

    /*
    ===============================
    Global Variables
    ===============================
    */

    // Buttons Array
    var topics = ["cat", "dog", "horse", "frog", "snake", "hamster", "fish", "bird", "aligator", "buffalo", "eagle"];

    var favorites = [];

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=1Wgl9oZdl7S0d1OGv2FAM6O2EpIyGU7T&limit=10&rating=pg&q=";

    /*
    ===============================
    Function Declarations
    ===============================
    */

    function displayGifs() {
        var $thisTopic = $(this).attr("data-name");
        $.ajax({
            url: queryURL + $thisTopic,
            method: "GET"
        }).then(function (response) {
            console.log(response);
            $("#gifs-go-here").empty();
            for (var i = 0; i < response.data.length; i++) {

                var $cardDiv = cardBuilder(response, i);

                $("#gifs-go-here").append($cardDiv);

            };
        });

    }

    function displayFavorites() {
        
    }

    function cardBuilder(response, i) {
        var $cardDiv = $("<div>").addClass("card col-3 my-2 mx-1").attr("style", "width: 18rem");

        var $cardImg = $("<img>").addClass("card-img-top gif mx-auto").attr("src", response.data[i].images.fixed_height_still.url).attr("data-still", response.data[i].images.fixed_height_still.url).attr("data-animate", response.data[i].images.fixed_height.url).attr("data-state", "still");;

        var $cardBody = $("<div>").addClass("card-body text-center");

        var $cardText = $("<p>").addClass("card-text font-weight-bold").text("Rating: " + response.data[i].rating.toUpperCase());

        var $cardButton = $("<button>").addClass("favorite").text("Add Favorite");

        // $cardText.append($cardButton);

        $cardBody.append($cardText);

        $cardBody.append($cardButton);

        $cardDiv.append($cardImg).append($cardBody);

        return $cardDiv
    }

    function renderButtons(arr) {
        $("#buttons-list").empty();

        for (var i = 0; i < arr.length; i++) {
            var $button = $("<button>");
            $button.addClass("topic").attr("data-name", arr[i]).text(arr[i]);

            $("#buttons-list").append($button);
        }
    }

    function addFavorite() {

        localStorage.setItem("userInfo", JSON.stringify(favsObj));

        var retrievedFromStorage = JSON.parse(localStorage.getItem("userInfo"));

        console.log("Returns [object Object]: " + retrievedFromStorage);
        console.log("Returns last name: " + retrievedFromStorage.lastName);
        console.log("Returns zip: " + retrievedFromStorage.address.zip);

        console.log("Returns last name: " + JSON.parse(localStorage.getItem("userInfo")).lastName);
    }

    /*
    ===============================
    Click Handlers
    ===============================
    */

    // Add new button
    $("#add-topic").on("click", function (event) {
        event.preventDefault();
        var topic = $("#topic-input").val();
        if (!topic.trim()) {
            alert("Enter something into the text box!");
        } else {
            topics.push(topic);
            renderButtons(topics);
            $("#topic-input").val("");
        }
    });

    // Render gifs
    $(document).on("click", ".topic", displayGifs);

    // Animate gifs
    $(document).on("click", ".gif", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate")).attr("data-state", "animate");
        } else {
            $(this).attr("src", $(this).attr("data-still")).attr("data-state", "still");
        }
    });

    // Add favorite
    $(document).on("click", ".favorite", function() {
        var still = $(this).parent().parent().children("img").attr("src");
        var animated = $(this).parent().parent().children("img").attr("data-animate");

        var favObj = {};

        favObj.still = still;
        favObj.animated = animated;

        favorites.push(favObj);

        localStorage.setItem("favorites", JSON.stringify(favorites));

    });

    /*
    ===============================
    Function Calls
    ===============================
    */
   
    // Render starting buttons
    renderButtons(topics);

    // Test
    // addFavorite();
});