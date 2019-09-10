// $('article.tweetContainer').hover(function(event) {
//   $('header.tweetHeader').css({'font-weight':'bold'})
//   $('span.tweetUsername').css({'color': '#4056A1'})
//   $('article.tweetContainer p.tweet').css({'font-weight':'bold'});
  
// });

$('article.tweetContainer').hover(function(event) {
  $('header.tweetHeader').css({'text-shadow': "1px 1px"})
  $('span.tweetUsername').css({'color': '#4056A1'})
  $('article.tweetContainer p.tweet').css({'text-shadow': "1px 1px"});
  $('article.tweetContainer').css({"box-shadow": "10px 5px 5px"});
  $('article.tweetContainer footer').css({'text-shadow': "1px 1px"});
});

$('article.tweetContainer').mouseleave(function(event) {
  $('header.tweetHeader').css({'text-shadow': "0px 0px"})
  $('span.tweetUsername').css({'color': '#f4f1ec'})
  $('article.tweetContainer p.tweet').css({'text-shadow': "0px 0px"});
  $('article.tweetContainer').css({"box-shadow": "0px 0px 0px"});
  $('article.tweetContainer footer').css({"text-shadow": "0px 0px 0px"});
});