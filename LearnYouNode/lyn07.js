#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 07 - Client HTTP
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var http = require('http');

if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname URL");
    return 1;
}

http.get(process.argv[2], function(res){
	
	res.setEncoding('utf-8');
	res.on('error', console.error);
	res.on('data', console.log);
});
