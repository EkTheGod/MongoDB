var express = require('express');
var app = express();
var path = require('path');
var fs = require('fs');
var outputFilename = '/MyProject/my.js';

var myData = {
	"CustomerID":"C0011111111",
	"Name":"Weerachai Nukitram",
	"Email":"win.weerachai@thaicreate.com",
	"CountryCode":"TH",
	"Budget":"1000000",
	"Used":"600000"
}

fs.writeFile(outputFilename, JSON.stringify(myData, null, 4), function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("JSON saved to " + outputFilename);
    }
}); 

app.get('/data', function(req, res){
	res.send({"key" : "Hello World"});
});
app.listen(5555);