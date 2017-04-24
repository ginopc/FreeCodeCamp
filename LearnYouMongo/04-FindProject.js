/* ========================================
 *   LearnYouMongo - Find Project
 *
 *   Author  : Maurizio Aru
 *   Created : 2017.04.24
 * ========================================
 */
 
var mongo = require('mongodb').MongoClient
var dbUrl = "mongodb://localhost:27017/learnyoumongo"

// check command line arguments
if (process.argv.count < 3) {
   
   console.error("[ERROR]: parameters missing");
}

var age = process.argv[2];

// open database connection
mongo.connect(dbUrl, function(err, db){
   
   if (err) throw err;

   var parrots = db.collection('parrots');
   parrots.find({
      age: {
         $gt: +age
      }
   }, {
      name: 1,
      age: 1,
      _id: 0
   }).toArray(function(err, docs){
      if (err) throw err;
      
      console.log(docs)
      db.close();
   });
 });