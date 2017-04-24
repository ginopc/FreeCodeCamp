/* ========================================
 *   LearnYouMongo - Update
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

var dbName = process.argv[2];
var dbUrl = "mongodb://localhost:27017/" + dbName;


// open database connection
mongo.connect(dbUrl, function(err, db){
   
   if (err) throw err;

   var collection = db.collection('users');
   
   var query = {
     'name': 'Tina',
     'age': 30,
     'username': 'tinatime'
   };
   var objUpdate = {
      $set: {
         age: 40
      }
   }
   collection.update( query, objUpdate, function(err, data){
      
      if (err) throw err;
      
      db.close();
   });
});
   