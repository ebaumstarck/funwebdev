$(document).ready(function(){
  var content = $("#flashcard").data("json"),
	 i = 0,// the index of the entry in the word list
    answer = {},// the chinese,pinyin entry saved for display after user click answer button 
    wrongWords  = []//list for saving wrong words to review later
    ;
// create menu for all the decks of cards
  $('#menu').menu({
    select: function(event,ui){
      $.ajax({
        url: "/deck/" + ui.item.text()
        // context: document.body
      })
      .done(function(data) {
      });
    }
  });
  // display the word by clicking the next button
  function display(list){
  // reset the flash card border color
    $('#flashcard').css('border-color','rgb(53,155,198)');
    if( i <  list.length){
      // clear the chinese and pinyin 
      $('#chinese').empty();
      $('#pinyin').empty();
      // display the english flash card
      $('#english').html(list[i].english);
      //save the chinese and pinyin answer for later
      answer.chinese = list[i].chinese;
      answer.pinyin = list[i].pinyin;
      
      i++;
    } 
    //display the first word
    if( i == list.length){
      i = 0;
    }
  }
  // shuffle the flash card
  function shuffle(){
    // fisher-yates shuffle algorithm
    var 
      count = content.length;
    if( count > 0){
      while( --count){
      var newCount = Math.floor(Math.random() * (count + 1)),
        temp = content[count],
        temp1 = content[newCount];
      content[count] = temp1;
      content[newCount] = temp;
      }
    }
  }
  //internal variable for save the javascript function
  var auto;
  //auto display the flash card per 1 second
  function autoDisplay(){
    var interval = 2000;//2000 millionseconds 
    auto = setInterval(function(){
      if( i <  content.length){
        // display the english flash card
        $('#english').html(content[i].english);
        $('#chinese').html(content[i].chinese);
        $('#pinyin').html(content[i].pinyin);
        i++;
      } 
      //display the first word
      if( i == content.length){
        i = 0;
      }
    },2000);
  }
  // stop auto display
  function stopAutoDisplay(){
    window.clearInterval(auto);
  }

  //click the button 
  $('#next')
    .button()
    .click(function() {
      display(content);
    });
  $('#shuffle')
    .button()
    .click(shuffle);
  $('#auto')
    .button()
    .click(autoDisplay);
  $('#stop')
    .button()
    .click(stopAutoDisplay);
  // display the answer when the user click the show the answer button
  $('#answer')
    .button()
    .click(function(){
      $('#chinese').html(answer.chinese);
      $("#pinyin").html(answer.pinyin);
    });
  $('#reviewBtn')
    .button()
    .click(function(){
      var wrongWord = content[i-1];
      wrongWords.push(wrongWord);
      $('#flashcard').css('border-color','red');
      //if($('#next').click()){
      //	$('#flashcard').css('border-color','4d90fe');
      //}
    });
  $('#reviewList')
    .button()
    .click(function(){
  
    });
  });
