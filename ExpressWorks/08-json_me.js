/* ==========================================
 *   ExpressWorks: Step 08 - JSON me
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.04.14
 * ==========================================
 *
 * SINTAX: node my_app.js PORT
 *
 */

var express = require('express');
var fs = require('fs');
var PORT = process.env.PORT;
var inFile = '';

// check comandline params
if (process.argv < 4){
    console.error('Missing boot parameters!');
    return;
}

var app = express();
PORT = Number(process.argv[2]);
inFile = process.argv[3];

// debug
console.log("PORT: " + PORT);
console.log("Input Filename: " + inFile);

app.get('/books', function(req,res){
  var fileContent = fs.readFile(inFile, function(err, data) {
    if (err) res.sendStatus(500);
    try {
      var book = JSON.parse(data);
    }
    catch(ex){
      res.sendStatus(500);
    }
    res.json(book);
  });
});


app.listen(PORT);
console.log('Server listening on port ' + PORT);
console.log('[CTRL+C] to close');
