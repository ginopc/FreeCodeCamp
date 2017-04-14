/* ==========================================
 *   ExpressWorks: Step 07 - What's in query
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.04.13
 * ==========================================
 *
 * SINTAX: node my_app.js PORT
 *
 */

var express = require('express');
var logger = require('morgan');
var PORT = process.env.PORT;

// check comandline params
if (process.argv < 3){
    console.error('Missing boot parameters!');
    return;
}

var app = express();
PORT = Number(process.argv[2]);

app.use(logger('short'));
app.get('/search', function(req,res){
  res.end(JSON.stringify(req.query));
});


app.listen(PORT);
console.log('Server listening on port ' + PORT);
console.log('[CTRL+C] to close');
