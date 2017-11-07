#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 10 - Server del tempo
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var net = require('net');
var strftime = require('strftime');

if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname URL");
    return 1;
}

var server = net.createServer(function(socket){
	var result;
	
	result = strftime('%Y-%m-%d %H:%M') + '\n';
	
	console.log(result);
	socket.end(result);
});
const PORT = process.argv[2];
server.listen(PORT);
