#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 13 - Server HTTP con API JSon
 *
 * author: Maurizio Aru
 * created: 2017.11.03
 */

const http = require('http');
const url = require('url');

const DEBUG = false;

// SYNTAX: node APPNAME PORT FILENAME
if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname URL");
    return 1;
}

const PORT = Number(process.argv[2]) || 3000;

const server = http.createServer( (req, res) => {

    var result = {
        hour: 14,
        minute: 23,
        second: 35
    };

    res.writeHead(200, { 'Content-Type': 'application/json'} );

    if (DEBUG) console.log('New Request: ', req.url);

    var decodedUrl = url.parse(req.url, true);
    if (DEBUG) console.log('pathname:', decodedUrl.pathname);
    if (DEBUG) console.log('query:', decodedUrl.query);
    var now = new Date(decodedUrl.query.iso);
    switch(decodedUrl.pathname) {
        case '/api/parsetime':
            result = {
                hour: now.getHours(),
                minute: now.getMinutes(),
                second: now.getSeconds()
            };
            res.write(JSON.stringify(result));
            res.end();
            break;

        case '/api/unixtime':
            result = {
                unixtime: now.valueOf()
            };
            res.write(JSON.stringify(result));
            res.end();
            break;

        default:
            res.errorCode = 404;
            result = { error: 'unkown request' };
            res.write(JSON.stringify(result));
            res.end();
            break;
    }
});
server.listen(PORT);
