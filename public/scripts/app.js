/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

//let renderedPostsArray = [] //This is where the tweets will go before being rendered.
const renderTweets = function(data) {
  for (tweets of data) {
    //let renderedPostsArray = [];
    //renderedPostsArray.push(tweets);
    let $tweet = createTweetElement(tweets)
    $('#allTweets').prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
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

  $("form#new-tweet").submit(function(e) {
    e.preventDefault()
    if ($("#input").val() === "" || $("#input").val() === null) {
      alert("Please type in a tweet!")
    } else if ($("#input").val().length > 140) {
      alert("You have exceeded 140 Characters!") 
    } else {
      
      let tweet = $.ajax({
        url: "/tweets",
        type: "POST",
        data: $("form#new-tweet").serialize()
    })
    .then((response) => {
      loadMostRecentTweet();
    })
    }
  })

  const loadTweets = () => {
    let tweets = $.ajax({
      url: "http://localhost:8080/tweets/",
      type: "GET",
      dataType: 'JSON'
    })
      .then((response) => {
        console.log(response);
      renderTweets(response);
    })
  }

  const loadMostRecentTweet = () => {
    $.ajax({
      url: "http://localhost:8080/tweets/",
      type: "GET",
      dataType: 'JSON'
    }) .then((response) => {
      renderTweets([response[response.length-1]]);
  })
  }

  loadTweets();
  
  
});

// const renderNewTweet = async (event) => {
//   event.preventDefault()
//   try {
//     let string = $("#input").val()

//     const response = await $.ajax ({
//       url: 'http://localhost:8080/tweets',
//       method: 'POST',
//       data: JSON.stringify({
//         user: 
//           {
//             name: "testUser",
//             avatars: "",
//             handle: "testtesttest"
//           },
//         content: 
//           {
//             "text": string
//           },
//         "created_at": 1461113959088
//       })
//     })

//     console.log(response);


//     // const response = await $.ajax({
//     //   url: `/public/`,
//     //   type: 'GET',
//     //   dataType: 'JSON'
//     // })

//     //console.log (response)

//   } catch (error) {
//     console.log("error")
//   }
// }

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
