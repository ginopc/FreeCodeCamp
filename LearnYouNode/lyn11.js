#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 11 - Server di file HTTP
 *
 * author: Maurizio Aru
 * created: 2017.11.02
 */

var http = require('http');
var fs = require('fs');

// SYNTAX: node APPNAME PORT FILENAME
if (process.argv.length < 4) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname URL");
    return 1;
}

const PORT = process.argv[2] || 3000;
const SOURCE_FILE = process.argv[3];

var server = http.createServer(function(req, res){
    res.writeHead(200, {'Content-Type': 'text/plain' });

    frs = fs.createReadStream(SOURCE_FILE);
    frs.pipe(res);
});
server.listen(PORT);

