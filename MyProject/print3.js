var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';
var bodyParser = require('body-parser');

var express = require('express');
var path = require('path');
var app = express();


var fs = require('fs');
var outputFilename = '/Dev/MyProject/my.js';
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
    res.sendFile(path.join(__dirname, 'data.html'));
  });

app.post('/myaction', function (req, res) {
  res.send('You sent the name "' + req.body.Book_ID + '".'+'"'+ req.body.Book_Name + '"' +'"'+req.body.Date+'"');
  collection.insert({Book_ID:req.body.Book_ID , Book_Name:req.body.Book_Name, Date:req.body.Date });
  console.log('Insert Success');
});
 
var server = app.listen(5555, function() {
    console.log('Web is running...');
});