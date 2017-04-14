/* ========================================
 *   ExpressWorks: Step 06 - Param Pam Pam
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.004.13
 * ========================================
 *
 * SINTAX: node my_app.js PORT
 *
 */

var express = require('express');
var crypto = require('crypto');
var PORT = Number(process.argv[2]);

// check comandline params
if (process.argv < 3){
    console.error('Missing boot parameters!');
    return;
}

var app = express();

app.put('/message/:id', function(req,res){
  var result = crypto.createHash('sha1').update(new Date().toDateString() + req.params.id).digest('hex');
  res.end(result);
});


app.listen(PORT);
console.log('Server listening on port ' + PORT);
console.log('[CTRL+C] to close');
