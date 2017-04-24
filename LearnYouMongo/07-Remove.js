/* ========================================
 *   LearnYouMongo - Remove
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.04.24
 * ========================================
 */
 
var mongo = require('mongodb').MongoClient

// check command line arguments
if (process.argv.count < 5) {
   
   console.error("[ERROR]: parameters missing");
}

var dbName = process.argv[2];
var dbUrl = "mongodb://localhost:27017/" + dbName;
var collectionName = process.argv[3];
var docID = process.argv[4];


// open database connection
mongo.connect(dbUrl, function(err, db){
   
   if (err) throw err;

   var collection = db.collection(collectionName);
   
   var query = {
     '_id': docID
   };
   collection.remove( query, function(err, data){
      
      if (err) throw err;
      
      db.close();
   });
});
   