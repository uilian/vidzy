var MongoClient = require('mongodb').MongoClient;
var document = require('./videos.json'); 
var url = 'mongodb://localhost:27017/vidzy';

MongoClient.connect(url, function(err, db) {
   if (err) return console.dir(err)
   var collection = db.collection('videos');
   collection.insert(document, {w:1}, function(err, result) {
      if (err) return console.dir(err);
      console.log('\n\tLoad finished!\n');
      process.exit(0);
   });   
});
