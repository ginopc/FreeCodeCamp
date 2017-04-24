/* ========================================
 *   LearnYouMongo - Insert
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.04.24
 * ========================================
 */
 
var mongo = require('mongodb').MongoClient
var dbUrl = "mongodb://localhost:27017/learnyoumongo"

// check command line arguments
if (process.argv.count < 4) {
   
   console.error("[ERROR]: parameters missing");
}

var firstName = process.argv[2];
var lastName = process.argv[3];


// open database connection
mongo.connect(dbUrl, function(err, db){
   
   if (err) throw err;

   var collection = db.collection('docs');
   
   // insert a document into 'docs' collection
   var doc = {
      'firstName': firstName,
      'lastName': lastName
   };
   
   collection.insert( doc, function(err, data){

      if (err) throw err;
      console.log(JSON.stringify(doc));
      db.close();
   });
});
   