#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 09 - Giocoliere asincrono
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var http = require('http');
var bl = require('bl');

if (process.argv.length < 5) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname URL");
    return 1;
}

/* print result stream in order */
function printResults () {
	for (var i = 0; i < 3; i++) {
		console.log(results[i])
	}
}

/* call http.get for url(index) */
function httpGet (index) {
  http.get(process.argv[2 + index], function (response) {
	response.pipe(bl(function (err, data) {
	  if (err) {
		return console.error(err)
	  }

	  results[index] = data.toString()
	  count++

	  if (count === 3) {
		printResults()
	  }
	}))
  })
}

/* main calls */
for (var i = 0; i < 3; i++) {
  httpGet(i)
}
