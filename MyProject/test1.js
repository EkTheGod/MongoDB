var express = require('express');
var bodyParser = require('body-parser');
var app     = express();

//Note that in version 4 of express, express.bodyParser() was
//deprecated in favor of a separate 'body-parser' module.
app.use(bodyParser.urlencoded({ extended: true })); 

//app.use(express.bodyParser());

app.post('/myaction', function(req, res) {
  res.send('You sent the name "' + req.body.namena + '".'+'"'+ req.body.id + '"' +'"'+req.body.message+'"');
  //ต้องกำหนด ชื่อ name
});

app.listen(5555, function() {
  console.log('Server running at http://127.0.0.1:5555/');
});