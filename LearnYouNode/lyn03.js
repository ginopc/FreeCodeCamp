#!/usr/bin/nodejs
/**
 * LearnYouNode Workshop
 * Step 03 - Il mio primo I/O
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */

var fs = require('fs');

if (process.argv.length < 3) {
    console.error("ERROR: arguments missing");
    return 1;
}

var contents = fs.readFileSync(process.argv[2])
var lines = contents.toString().split('\n').length - 1
console.log(lines)
