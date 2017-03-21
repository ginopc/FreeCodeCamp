/**
	Random Quote Machine scripts

	Author  : Maurizio Aru
	Created : 2016.08.19

*/


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
  //$.getJSON("https://github.com/ginopc/FreeCodeCamp/blob/master/quotes.json", function(data){
  $.getJSON("quotes.json", parseContent);
}

$(document).ready(function(){
  console.log("I'm ready!");
  getQuote();
  
  $("#next-quote").on("click", getQuote);
});
