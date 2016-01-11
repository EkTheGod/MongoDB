var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';

var express = require('express');
var path = require('path');
var app = express();


var fs = require('fs');
var outputFilename = '/Dev/MyProject/my.js';
var collection;
var mydata;

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
    res.sendFile(path.join(__dirname, 'index.html'));
  });
 
var server = app.listen(5555, function() {
    console.log('Web is running...');
});