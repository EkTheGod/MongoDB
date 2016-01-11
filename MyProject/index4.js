var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';

var express = require('express');
var path = require('path');
var app = express();
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

var http = require('http'),
    fs = require('fs');

var collection;

MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the mongoDB server. Error:', err);
  } else {
    
    console.log('Connection established to', url);

 
    collection = db.collection('info');
    }
});//end connect

  function getHomePage(req, res, next) {
    collection.find().toArray(function(err, articles) {
      res.readFile('./index.html', function (err, html) {
            if (err) {
                throw err; 
            }       
            http.createServer(function(request, response) {  
            response.writeHeader(200, {"Content-Type": "text/html"});  
            response.write(html);  
            response.end();  
            }).listen(8000);
      });
    });
  }//end getHomePage
