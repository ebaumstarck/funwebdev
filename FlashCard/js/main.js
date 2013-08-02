
// the flashcards in the deck
var flashcards = [];
// which flashcard we are showing
var flashcardi = -1;

// initializes the deck of flashcards
function initDeck() {
  flashcards = $("#flashcard").data("json");
  flashcardi = flashcards.length - 1;
}

// shuffles the deck of flashcards
function shuffle() {
  // fisher-yates shuffle algorithm
  var count = flashcards.length;
  if (count > 0) {
    while (--count){
      var newCount = Math.floor(Math.random() * (count + 1)),
        temp = flashcards[count],
        temp1 = flashcards[newCount];
      flashcards[count] = temp1;
      flashcards[newCount] = temp;
    }
  }
}

// display the current flashcard and increment the counter
function displayNext(list) {
  // reset the flash card border color
  // $("#flashcard").css("border-color","rgb(53,155,198)");
  if (flashcardi < flashcards.length){
    var card = flashcards[flashcardi];
    $("#english").html(card.english);
    $("#chinese").html(card.chinese);
    $("#pinyin").html(card.pinyin);
    flashcardi++;
  } 
  //display the first word
  if (flashcardi == flashcards.length){
    flashcardi = 0;
  }
}

//internal variable for save the javascript function
var auto = null;
// start or stop auto show a new flashcard every 2 seconds
function autoDisplay() {
  if (auto) {
    window.clearInterval(auto);
    auto = null;
  } else {
    auto = setInterval(displayNext, 2000);
  }
}

$(document).ready(function() {
  initDeck();
  // create menu for all the decks of cards
  $("#menu").menu({
    select: function(event, ui) {
      $.ajax({
        url: "/deck/" + ui.item.text()
      });
    }
  });

  $("#auto").button().click(autoDisplay);
  $("#next").button().click(displayNext);
  $("#shuffle").button().click(shuffle);
  $("#show").buttonset();
  $("#show input").click(function() {
    var id = $(this).attr("id");
    $(".front > div").appendTo($(".back"));
    var languageId = id.match(/^show(.*)$/)[1].toLowerCase();
    $("#" + languageId).appendTo($(".front"));
  });
});
