#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 12 - Maiuscolatore HTTP
 *
 * author: Maurizio Aru
 * created: 2017.11.02
 */

const http = require('http');

// SYNTAX: node APPNAME PORT FILENAME
if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    console.error("Syntax: appname URL");
    return 1;
}

const PORT = Number(process.argv[2]) || 3000;

const server = http.createServer( (req, res) => {
    var result = '';

    res.writeHead(200, {'Content-Type': 'text/plain' });

    req.on('data', (chunk) => {
        result += chunk;
    });

    req.on('end', () => {
        try {
            res.write(result.toUpperCase());
            res.end();
        }
        catch(ex){
            res.errorCode = 400;
            res.end(`error: ${ex.message}`);
        }
    });
});
server.listen(PORT);

