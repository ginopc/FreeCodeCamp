/* ===================================
 *   Express HelloWorld
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.03.27
 * ===================================
 */


var express = require('express')
var app = express()

if (process.argv < 3){
    console.error('Missing boot parameters!');
    return;
}

var PORT = Number(process.argv[2]);

app.get('/home', function(req, res) {
  res.end('Hello World!')
})
app.listen(PORT);