$(document).ready(function() {

  $("section form #input").keyup(function(event) {
    let string = $("#input").val()
    let counter = 140 - string.length;

    if (counter < 0) {
      console.log("The counter is less than zero!")
      $('section.new-tweet form #counter').css({'color': 'red'});
    } else if (counter >= 0) {
      console.log("The counter is higher than zerooooo")
      $('section.new-tweet form #counter').css({'color': '#4056A1'});
    }
    $('#counter').text(counter);

    //$('section.tweetContainer').append("Some appended text.");


  });

  



});