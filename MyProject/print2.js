var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';

var express = require('express');
var path = require('path');
var app = express();  

app.use(express.static(path.join(__dirname, 'public')));

var collection;

/*
var bodyParser = require('body-parser')
app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 
*/

MongoClient.connect(url, function (err, db, req, res) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection to', url);
        collection = db.collection('info');
    }
});//end connect

app.get('/data', function ( req, res) {
    collection.find().sort( { Book_ID: 1 } ).toArray(function(err, articles) {
        res.send(articles);
    });
});

app.get('/senddata', function ( req, res) {
    var start = parseInt(req.param('dpp'))*parseInt(req.param('cp')) ;
    collection.find().sort( { Book_ID: 1 } ).skip(start).limit( parseInt(req.param('dpp')) ).toArray(function(err, articles){
        res.send(articles);
    });
});

app.get('/datacount', function ( req, res) {
    collection.find().toArray(function(err, articles) {
        var l = articles.length;
        res.json(l);
    });
});

app.get('/', function ( req, res) {
    res.sendFile(path.join(__dirname, 'paging.html'));
});
 
var server = app.listen(5555, function() {
    console.log('Web is running...');
});