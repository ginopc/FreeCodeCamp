/**
	Random Quote Machine scripts

	Author  : Maurizio Aru
	Created : 2016.08.19

*/

/* parse json to convert a quote */
function parseContent(data){
  console.log("parseContent called");
  var content = "This is the next quote",
      author = "Maurizio Aru",
      num = Math.floor(Math.random() * 20);
  content = data[num]["content"]
  author = data[num]["author"];
  console.log("Content: " + content + " | Author: " + author);
  $(".quote-text").html(content);
  $(".quote-author").html("- " + author);
}

function getQuote(){
  console.log("getQuote called");
  $(".quote-text").html("This is my first quote");
  $(".quote-author").html("- Maurizio Aru");
  $.getJSON("https://gist.githubusercontent.com/AbhishekChd/ab9949b618fcbf58ac84f9c8e88d6688/raw/90916f0d09a295eb5b2eea6c29a648e8c60b0e6f/5769a491e4b01190df7a9a70.json", parseContent);
}

function tweet(){
  console.log("Posting on Twitter...");
  var content = $('#quote-text').text();
  var author = $('#quote-author').text();
  var link= "https://twitter.com/intent/tweet?text="+ content +" -- " + author + " &hashtags=quote";
  window.open(link,'_blank');
}

function postFb(){
  console.log("Posting on Facebook...")
}

$(document).ready(function(){
  console.log("I'm ready!");
  getQuote();
  
  $("#next-quote").on("click", getQuote);
  $("#btn-twitter").on("click", tweet);
  $("#btn-facebook").on("click", postFb);
});

