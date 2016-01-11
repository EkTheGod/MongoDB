var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';

var express = require('express');
var path = require('path');
var app = express();

var http = require('http');
var fs = require('fs');

var collection;

MongoClient.connect(url, function (err, db) {
    if (err) {
        console.log('Unable to connect to the mongoDB server. Error:', err);
    } else {
        console.log('Connection established to', url);
        collection = db.collection('info');
    }
});//end connect

var fileName = 'D:/MyProject/index2.php';
var stream = fs.createWriteStream(fileName);
var body,merge;

stream.once('open', function(fd) {
        var html = buildHtml();
        stream.end(html); 
});


http.createServer(function (req, res) {

    collection.find().toArray(function(err, articles) {
    var count = articles.length;
    body = '<table border="1" style="width:30%"><tr><td>Book_ID</td><td>Book_Name</td><td>Date</td></tr>';
        for (var i = 0; i < count; i++) 
            body += '<tr><td>'+articles[i].Book_ID+'</td><td>'+articles[i].Book_Name+'</td><td>'+articles[i].Date+'</td></tr>';
    });
    body += '</table>';

    var html = buildHtml(req);

    res.writeHead(200, {
        'Content-Type': 'text/html',
        'Content-Length': html.length,
        'Expires': new Date().toUTCString()
    });
    res.end(html);
}).listen(8080);


function buildHtml(req,res) {

    var header = '<font size="6">Book Store</font>';
    return '<!DOCTYPE html>'+'<html><header>'+header+'</header>'+body+'</body></html>';
};