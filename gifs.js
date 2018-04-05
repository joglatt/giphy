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
    var b = $("<button>");
    b.addClass("gifButton");
    b.text(buttonArray[i]);
    $("#button-con").append(b);
  }
}

function animateGif() {
  $("#gif-con").on("click",".gif", function() {
    var move = $(this).attr("alt");
    var still = $(this).attr("src");
     
   if($(this).attr("src") === move){
    $(this).attr("src", still);
    $(this).attr("alt", move);
   }else if ($(this).attr("src") === still){
    $(this).attr("src" , move);
    $(this).attr("alt" , still);
   }
  });
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
        var frame = $("<div class='gif-frame'>")
        var gif = $("<img>", {
          src: response.data[i].images.fixed_height_still.url,
          class: "gif",
          alt: response.data[i].images.fixed_height.url
        });
        var rating =(response.data[i].rating).toUpperCase();
        var info = $("<div class='info'>Rating: "+rating+"</div>")
                
        $(frame).append(gif);
        $(frame).append(info);
        $("#gif-con").append(frame);
      }
      
    });
  });
}

$(document).ready(function() {
  displayButtons();
  displayGif();
  submitClick();
  animateGif();
});
