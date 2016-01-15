var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';

var express = require('express');
var path = require('path');
var app = express();  

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
    collection.find().sort( { Book_ID: 1 } ).toArray(function(err, articles) {
      res.send(articles);
      //console.log(articles.length);
    });
  });

app.post('/senddata', function ( req, res) {

  

  /*
    var start = 0;
    var dataperpage = 5;
    var i=1;
    var len;
    collection.find().toArray(function(err, articles) {
        len = articles.length;
    });

    while( (i*dataperpage) <=len){
        collection.find().sort( { Book_ID: 1 } ).skip(start).limit(dataperpage).toArray(function(err, articles){
            res.send(articles);
        });
        start = dataperpage*i - 1;

    }
    */
});

/*
app.get('/datacount', function ( req, res) {
    collection.find().toArray(function(err, articles) {
      var l = articles.length;
      res.json(l);
    });
});
*/

app.get('/', function ( req, res) {
    res.sendFile(path.join(__dirname, 'paging.html'));
  });
 
var server = app.listen(5555, function() {
    console.log('Web is running...');
});