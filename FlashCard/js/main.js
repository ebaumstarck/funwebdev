$(document).ready(function(){
	var content = [
	  { "english":"hello",
		"chinese":"你好",
		"pinyin":"ni3hao3"
	  },
	  { "english":"thanks",
		"chinese":"谢谢",
		"pinyin":"xie4xie4"
	  },
	  { "english":"welcome",
		"chinese":"欢迎",
		"pinyin":"huan1ying2"
	  },
	  { "english":"you are welcome",
		"chinese":"不用谢",
		"pinyin":"bu2yong4xie4"
	  },
	  { "english":"wait a moment",
		"chinese":"等一下",
		"pinyin":"deng3yi1xia4"
	  },
	  { "english":"drive a car",
		"chinese":"开车",
		"pinyin":"kai1che1"
	  },
	  { "english":"good",
		"chinese":"好",
		"pinyin":"hao3"
	  },
	   { "english":"bad",
		"chinese":"坏",
		"pinyin":"huai4"
	  },
	  { "english":"expensive",
		"chinese":"贵",
		"pinyin":"gui4"
	  },
	  { "english":"cheap",
		"chinese":"便宜",
		"pinyin":"pian2yi2"
	  },
	  { "english":"busy",
		"chinese":"忙",
		"pinyin":"mang2"
	  },
	  { "english":"difficult",
		"chinese":"难",
		"pinyin":"nan2"
	  },
	  { "english":"smart",
		"chinese":"聪明",
		"pinyin":"cong1ming2"
	  },
	  { "english":"pretty",
		"chinese":"漂亮",
		"pinyin":"piao4liang4"
	  },
    { "english":"cute",
		"chinese":"可爱",
		"pinyin":"ke3ai4"
	  }
	],
	 i = 0,// the index of the entry in the word list
    answer = {},// the chinese,pinyin entry saved for display after user click answer button 
    wrongWords  = []//list for saving wrong words to review later
    ;
  // display the word by clicking the next button
  function display(list){
  // reset the flash card border color
    $('#flashcard').css('border-color','#4d90fe');
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
  $('#next').click(function() {
    display(content);
  });
  $('#shuffle').click(shuffle);
  $('#auto').click(autoDisplay);
  $('#stop').click(stopAutoDisplay);
  // display the answer when the user click the show the answer button
  $('#answer').click(function(){
    $('#chinese').html(answer.chinese);
    $("#pinyin").html(answer.pinyin);
  });
  $('#reviewBtn').click(function(){
    var wrongWord = content[i-1];
    wrongWords.push(wrongWord);
    $('#flashcard').css('border-color','red');
    //if($('#next').click()){
    //	$('#flashcard').css('border-color','4d90fe');
    //}
  });
  $('#reviewList').click(function(){
  
  });
});
