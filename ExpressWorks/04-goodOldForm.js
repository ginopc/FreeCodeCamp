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
var app = express();
var path = require('path');
var bodyparser = require('body-parser');

// check comandline params
if (process.argv < 4){
    console.error('Missing boot parameters!');
    return;
}

var PORT = Number(process.argv[2]);

// middleware import
app.use(bodyparser.urlencoded({ extended: false }));

// define routes
app.use(express.static( path.join(__dirname, 'public')) );
app.post('/form', function(req,res){
  res = req.body.str.split('').reverse().join('');
});

app.listen(PORT);
console.log('Server listening on port ' + PORT);
console.log('[CTRL+C] to close');
