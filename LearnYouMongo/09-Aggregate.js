/* ========================================
 *   LearnYouMongo - Aggregate
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.04.24
 * ========================================
 */
 
var mongo = require('mongodb').MongoClient

// check command line arguments
if (process.argv.count < 3) {
   
   console.error("[ERROR]: parameters missing");
}

var dbName = "learnyoumongo";
var dbUrl = "mongodb://localhost:27017/" + dbName;
var collectionName = "prices";
var sizeFlt = process.argv[2];

var matchCmd = { size: sizeFlt };
var groupCmd = { 
      _id: 'average',
      average: {
         $avg: '$price'
      }
};

/*
console.log('match filter:' + JSON.stringify(matchCmd));
console.log('group filter:' + JSON.stringify(groupCmd));
*/

// open database connection
mongo.connect(dbUrl, function(err, db){
   
   if (err) throw err;

   var collection = db.collection(collectionName);
   
   collection.aggregate([ 
      { $match: matchCmd }, 
      { $group: groupCmd }
   ]).toArray(function(err, results){
      
      if (err) throw err;
      if (results.isNaN){
         throw new Error('No results found');
      }
      
      var result = results[0];
      console.log(Number(result.average).toFixed(2));
      db.close();
   });
});
   