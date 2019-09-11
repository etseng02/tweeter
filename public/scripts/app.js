/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json
const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
]

const renderTweets = function(data) {
  for (tweets of data) {
    let $tweet = createTweetElement(tweets)
    $('#allTweets').append($tweet);
  }
// loops through tweets
// calls createTweetElement for each tweet
// takes return value and appends it to the tweets container
}

const createTweetElement = function(tweet) {
//let $tweet = $('<article>').addClass('tweetContainer');
// ...
return `<article class="tweetContainer">
          <header class="tweetHeader">
            <img src=${tweet.user.avatars}> 
            <span class="tweetName">${tweet.user.name}</span>
            <span class ="tweetUsername">${tweet.user.handle}</span>
          </header>
          <p class = 'tweet'>${tweet.content.text}</p>
          <footer>
            <span>${tweet.created_at} days ago</span>
            <span class = "heart"><i class="fas fa-heart"></i></i></span>
            <span class = "retweet"><i class="fas fa-retweet"></i></i></span>
            <span class = "flag"><i class="fas fa-flag"></i></span>
          </footer>
          </article> `
}
$(document).ready(function(){
  renderTweets(data);
});

{/* <article class="tweetContainer">
<header class="tweetHeader">
    <img src="https://i.imgur.com/73hZDYK.png"> 
    <span class="tweetName">Newton</span>
    <span class ="tweetUsername">@newnewton</span>
</header>

<p class = 'tweet'>If I have seen further it is by standing on the shoulders of giants</p>
<footer>
<span>Seen 10 days ago</span>
<span class = "heart"><i class="fas fa-heart"></i></i></span>
<span class = "retweet"><i class="fas fa-retweet"></i></i></span>
<span class = "flag"><i class="fas fa-flag"></i></span>
</footer>

</article> */}
