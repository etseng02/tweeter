const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
};

const renderTweets = function(data) {
  for (let tweets of data) {
    // Calculate the date day in miliseconds - the date of when the date was created at
    let daysAgo = (Math.round((Date.now() - tweets.created_at) / (60 * 60 * 24 * 1000)));
    let $tweet = createTweetElement(tweets, daysAgo);
    $('#allTweets').prepend($tweet);
  }
};

const createTweetElement = function(tweet, daysAgo) {

  return `<article class="tweetContainer">
          <header class="tweetHeader">
            <img src=${escape(tweet.user.avatars)}> 
            <span class="tweetName">${escape(tweet.user.name)}</span>
            <span class ="tweetUsername">${escape(tweet.user.handle)}</span>
          </header>
          <p class = 'tweet'>${escape(tweet.content.text)}</p>
          <footer>
            <span>${daysAgo} days ago</span>
            <span class = "heart"><i class="fas fa-heart"></i></i></span>
            <span class = "retweet"><i class="fas fa-retweet"></i></i></span>
            <span class = "flag"><i class="fas fa-flag"></i></span>
          </footer>
          </article> `;
          
};

const characterLimitError = function() {
  return `<span id = "errorMessage">You have exceeded 140 characters!</span>`;
};

const nullValueError = function() {
  return `<span id = "errorMessage">You cannot tweet an empty tweet!</span>`;
};

// Displays error messages with slide animation
const displayErrorMessage = function(message) {
  $('.errorCode').append(message);
  $('#errorMessage').slideToggle();
  $('#errorMessage').css({"display": "flex"});
};

const removeErrorMessage = function() {
  $('#errorMessage').remove();
  $('#errorMessage').css({"display": "none"});
};

const loadTweets = () => {
  $.ajax({
    url: "http://localhost:8080/tweets/",
    type: "GET",
    dataType: 'JSON'
  })
    .then((response) => {
      renderTweets(response);
    });
};

const loadMostRecentTweet = () => {
  $.ajax({
    url: "http://localhost:8080/tweets/",
    type: "GET",
    dataType: 'JSON'
  })
    .then((response) => {
      renderTweets([response[response.length - 1]]);
    });
};

$(document).ready(function() {
  
  //On Tweet Button click, run this function
  $("form#new-tweet").submit(function(e) {
    e.preventDefault();

    // First remove any existing error messages
    removeErrorMessage();

    //Validate to see if user input is not empty or over 140 characters
    if ($("#input").val() === "" || $("#input").val() === null) {
      let message = nullValueError();
      displayErrorMessage(message);
    } else if ($("#input").val().length > 140) {
      let message = characterLimitError();
      displayErrorMessage(message);
    } else {
      // After validation, post textbox input to /tweets
      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $("form#new-tweet").serialize()
      })
      //Load the most recent tweet and render that specific tweet and append to the top without re-rendering every other tweet
        .then(() => {
          loadMostRecentTweet();
          $('#input').val("")
        })
        .then(() => {
          $('#errorMessage').remove();
        });
    }
  });

  // On clock of the new tweet button, remove any previous error messages
  $('div.newTweetButton').on('click', function() {
    $('#errorMessage').remove();
    //$('section.new-tweet').slideDown();
    $('section.new-tweet').slideToggle();
    $('#input').focus()
  });

  //load initial tweets after document is ready to receive input
  loadTweets();
  
});