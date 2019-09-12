const escape =  function(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

const renderTweets = function(data) {
  for (tweets of data) {
    let $tweet = createTweetElement(tweets)
    $('#allTweets').prepend($tweet);
  }
}

const createTweetElement = function(tweet) {
return `<article class="tweetContainer">
          <header class="tweetHeader">
            <img src=${escape(tweet.user.avatars)}> 
            <span class="tweetName">${escape(tweet.user.name)}</span>
            <span class ="tweetUsername">${escape(tweet.user.handle)}</span>
          </header>
          <p class = 'tweet'>${escape(tweet.content.text)}</p>
          <footer>
            <span>${escape(tweet.created_at)} days ago</span>
            <span class = "heart"><i class="fas fa-heart"></i></i></span>
            <span class = "retweet"><i class="fas fa-retweet"></i></i></span>
            <span class = "flag"><i class="fas fa-flag"></i></span>
          </footer>
          </article> `
}

const characterLimitError = function() {
  return `<span id = "errorMessage">You have exceeded 140 characters!</span>`
}

const nullValueError = function() {
  return `<span id = "errorMessage">You cannot tweet an empty tweet!</span>`
}

const displayErrorMessage = function (message) {
  $('.errorCode').append(message)
  $('#errorMessage').slideDown();
  $('#errorMessage').css({"display": "flex"})
}

const removeErrorMessage = function(){
  $('#errorMessage').remove();
  $('#errorMessage').css({"display": "none"})
}

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

$(document).ready(function(){
  
  //On Tweet Button click, run this function
  $("form#new-tweet").submit(function(e) {
    e.preventDefault()

    // First remove any existing error messages
    removeErrorMessage();

    //Validate to see if user input is not empty or over 140 characters
    if ($("#input").val() === "" || $("#input").val() === null) {
      let message = nullValueError()
      displayErrorMessage(message)
    } else if ($("#input").val().length > 140) {
      let message = characterLimitError()
      displayErrorMessage(message)
    } else {

      $.ajax({
        url: "/tweets",
        type: "POST",
        data: $("form#new-tweet").serialize()

    })
    .then(() => {
      loadMostRecentTweet();
    })
    .then(() => {
      $('#errorMessage').remove();
    })
    }
  })

  
  $('div.newTweetButton').on('click', function(){
    $('#errorMessage').remove();
    $('section.new-tweet').toggle();
  });

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
