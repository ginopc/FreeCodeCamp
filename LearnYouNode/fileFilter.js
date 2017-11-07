/**
 * LearnYouNode Workshop
 * Step 06 - Modularizzalo (module)
 *
 * author: Maurizio Aru
 * created: 2017.10.26
 */
 
var fs = require('fs');
var path = require('path');

function printList(dirname, filterStr, callback){
	
	fs.readdir(dirname, function(err, files){
		if (err){
			return callback(err);
		}
		
		var list = []
		list = files.filter(function(file){
			return ( path.extname(file) === '.'+filterStr )
		});
		
		callback(null, list);
	});
	
}

module.exports = printList;
