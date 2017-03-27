/* ===================================
 *   ExpressWorks: Step 2 - Static
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
var DOC_ROOT_PATH = process.argv[3];

app.use(express.static(DOC_ROOT_PATH||path.join(__dirname, 'public')));
app.listen(PORT);