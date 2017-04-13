/* ========================================
 *   ExpressWorks: Step 04 - Good old form
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.03.27
 * ========================================
 *
 * SINTAX: node my_app.js PORT DOC_ROOT_PATH
 *
 */

var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var PORT = Number(process.argv[2]);

// check comandline params
if (process.argv < 4){
    console.error('Missing boot parameters!');
    return;
}

var app = express();

// middleware import
app.use(bodyparser.urlencoded({ extended: false }));

// define routes
app.post('/form', function(req,res){
  res.end(req.body.str.split('').reverse().join(''));
});

app.listen(PORT);
console.log('Server listening on port ' + PORT);
console.log('[CTRL+C] to close');
