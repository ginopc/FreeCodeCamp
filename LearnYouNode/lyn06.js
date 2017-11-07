#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 06 - Modularizzalo
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var mymodule = require('./fileFilter');

if (process.argv.length < 4) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname path filter");
    return 1;
}

mymodule(process.argv[2], process.argv[3], function(err, data){
	
	if (err) {
		console.error(err);
		throw err;
	}

	data.forEach(function(item){
		console.log(item);
	});
});

