var buttonArray = ["Norm Macdonald", "Chris Farley"];
var userTerm;
var submit;
function submitClick() {
  //on click, user term is submitted and a button is created
  $("#submit").on("click", function(x) {
    x.preventDefault();
    $("#button-con").empty();
    submit = $("#textbox").val();
    buttonArray.push(submit);
    console.log(buttonArray);
    //Would it be more efficent to append a button rather than redisplaying them all?
    displayButtons();
    displayGif();
    $("#textbox").val("");
  });
}

function displayButtons() {
  for (var i = 0; i < buttonArray.length; i++) {
    var b = $("<a>");
    b.addClass("gifButton waves-effect waves-light btn");
    b.text(buttonArray[i]);
    $("#button-con").append(b);
  }
}

//on click function for showing gifs
function displayGif() {
  //must generate buttons with button class
  $(".gifButton").on("click", function() {
    $("#gif-con").empty();
    userTerm = $(this).text();
    var queryURL =
      "https://api.giphy.com/v1/gifs/search?api_key=lwqDafcEL3ZIEU1Zs7ZOL1aDzlJxhMZc&q=" +
      userTerm +
      "&limit=10&lang=en";
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(queryURL);
      console.log(response.data[0].images.original_still);
      console.log(response.data[0].images.original);
      console.log(response.data[0].rating);

      for (var i = 0; i < response.data.length; i++) {
        var frame = $("<div class='gif-frame center-align'>");
        var gif = $("<img>");
          gif.attr ({
          class: "gif",
          src: response.data[i].images.fixed_height_still.url,
          animate: response.data[i].images.fixed_height.url,
          stop: response.data[i].images.fixed_height_still.url,
        });

        $(".gif").attr("state" , "still");

        var rating = response.data[i].rating.toUpperCase();
        var info = $("<div class='info'>Rating: " + rating + "</div>");

        $(frame).append(gif);
        $(frame).append(info);
        $("#gif-con").append(frame);  
      }
    });
  });
}
function animateGif() {
  $("#gif-con").on("click", ".gif", function() {
    var state = $(this).attr("state");

    if (state === "still") {
      $(this).attr("src", $(this).attr("animate"));
      $(this).attr("state", "move");
    } else {
      $(this).attr("src", $(this).attr("stop"));
      $(this).attr("state", "still");
    }
  });
}

$(document).ready(function() {
  displayButtons();
  displayGif();
  submitClick();
  animateGif();
});
