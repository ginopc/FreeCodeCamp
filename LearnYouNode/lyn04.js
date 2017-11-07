#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 04 - Il mio primo I/O asincrono
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var fs = require('fs');

if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    return 1;
}

var file = process.argv[2];
fs.readFile(file, "utf-8", function (err, data) {
  if (err) {
	return console.log(err)
  }

  console.log( data.split('\n').length - 1 )
})
