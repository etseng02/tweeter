$(document).ready(function() {

  $("section form #input").keyup(function() {
    let string = $("#input").val()
    let counter = 140 - string.length;

    if (counter < 0) {
      $('section.composeNewTweet form #counter').css({'color': 'darkred'});
    } else if (counter >= 0) {
      $('section.composeNewTweet form #counter').css({'color': '#4056A1'});
    }
    $('#counter').text(counter);

    //$('section.tweetContainer').append("Some appended text.");


  });

  



});