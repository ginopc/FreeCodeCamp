/* ===================================
 *   Express HelloWorld
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.03.27
 * ===================================
 *
 * SINTAX: node my_app.js PORT DOC_ROOT_PATH
 *
 */


var express = require('express');
var path = require('path');
var app = express();

// check comandline params
if (process.argv < 4){
    console.error('Missing boot parameters!');
    return;
}

var PORT = Number(process.argv[2]);
var DOC_ROOT_PATH = path.dirname(process.arv[3]);

app.get('/home', function(req, res) {
  res.end('Hello World!')
})
app.listen(PORT);