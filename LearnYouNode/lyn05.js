#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 05 - LS filtrato
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var fs = require('fs');
var path = require('path');

if (process.argv.length < 4) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname path filter");
    return 1;
}

var dirname = process.argv[2];
var filter = process.argv[3];

fs.readdir(dirname, function(err, files){
	if (err){
		console.log(err);
		throw err;
	}
	
	files.forEach(function(file){
		if (path.extname(file) === '.'+filter) {
			console.log(file);
		}
	});
});
