#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 08 - Collecttore HTTP
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var http = require('http');
var bl = require('bl');

if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname URL");
    return 1;
}

http.get(process.argv[2], function(res) {
  res.pipe(bl(function (err, data) {
	if (err) {
	  return console.error(err);
	}
	data = data.toString();
	console.log(data.length);
	console.log(data);
  }));
});
    
