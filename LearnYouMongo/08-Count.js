/* ========================================
 *   LearnYouMongo - Count
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
var collectionName = "parrots";
var age = process.argv[2];


// open database connection
mongo.connect(dbUrl, function(err, db){
   
   if (err) throw err;

   var collection = db.collection(collectionName);
   
   var query = {
      age: {
         $gt: +age
      }
   };
   collection.count( query, function(err, count){
      
      if (err) throw err;
      
      console.log(count);
      db.close();
   });
});
   