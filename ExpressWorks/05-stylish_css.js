/* ========================================
 *   ExpressWorks: Step 05 - Stylish
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.04.13
 * ========================================
 *
 * SINTAX: node my_app.js PORT
 *
 */

var express = require('express');
var path = require('path');
var stylus = require('stylus');
var PORT = Number(process.argv[2]);

// check comandline params
if (process.argv < 3){
    console.error('Missing boot parameters!');
    return;
}

var app = express();

app.use(stylus.middleware(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));

/*
app.get('/', function(request, response){
  response.end(200, 'OK');
});
*/
app.listen(PORT);
console.log('Server listening on port ' + PORT);
console.log('[CTRL+C] to close');
