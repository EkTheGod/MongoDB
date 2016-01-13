var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';
var bodyParser = require('body-parser');

var express = require('express');
var path = require('path');
var app = express();
var assert = require('assert');

var collection;
var mydata;

app.use(bodyParser.urlencoded({ extended: true })); 

MongoClient.connect(url, function (err, db, req, res) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    
    console.log('Connection established to', url);

    collection = db.collection('info');

    }
});//end connect

app.get('/data', function ( req, res) {
    collection.find().toArray(function(err, articles) {
      return res.send(articles);
    });
  });

app.get('/', function ( req, res) {
    res.sendFile(path.join(__dirname, 'data management.html'));
  });


app.post('/insert', function (req, res) {

  var id = req.body.Book_ID;
  var name = req.body.Book_Name;

  if(req.body.Book_ID != "" && req.body.Book_Name != "" && req.body.Date != "")
  {   collection.findOne( { Book_ID : req.body.Book_ID } , function(err ,find){
        if( find == null || id != find.Book_ID || name != find.Book_Name )
        {   collection.insert({Book_ID:req.body.Book_ID , Book_Name:req.body.Book_Name, Date:req.body.Date });
            res.send('Success');
        }
        else
        {   res.send('Allready Have It');
        }
      });
  }
  else if(req.body.Book_ID == "" || req.body.Book_Name == "" || req.body.Date == "")
        {   res.send('You did not Enter All');  }

  res.sendFile(path.join(__dirname, 'data management.html'));    
});






app.post('/remove', function (req, res) {
  collection.insert({Book_ID:req.body.Book_ID , Book_Name:req.body.Book_Name, Date:req.body.Date });
  res.send("1");
  console.log('Insert Success');
});
 
var server = app.listen(5555, function() {
    console.log('Web is running...');
});