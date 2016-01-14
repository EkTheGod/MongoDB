var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var url = 'mongodb://localhost:27017/book';
var bodyParser = require('body-parser');

var express = require('express');
var path = require('path');
var app = express();


var assert = require('assert');
var fs = require('fs');

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
    collection.find().sort( { Book_ID: 1 } ).toArray(function(err, articles) {
      return res.send(articles);
    });
});

app.get('/', function ( req, res) {
    res.sendFile(path.join(__dirname, 'data management.html'));
  });

app.get('/show', function ( req, res) {
    res.sendFile(path.join(__dirname, 'paging.html'));
  });


app.post('/insert', function (req, res) {

  var id = req.body.Book_ID;
  var name = req.body.Book_Name;
  var findId,findName;
  
  if(req.body.Book_ID != "" && req.body.Book_Name != "" && req.body.Date != "")
  {     
        collection.findOne( { Book_ID : id } , function(err, articles) {
            findId = articles;
        
            collection.findOne( { Book_Name : name } , function(err, articles2) {
                findName = articles2;
        
        
            if( findId == null && findName == null)
            {   collection.insert({ Book_ID:req.body.Book_ID , Book_Name:req.body.Book_Name, Date:req.body.Date });
                res.sendFile(path.join(__dirname, 'data management.html'));
                return 'Insert : Success';
            }
            else
            {   console.log('Allready Have It');
                res.sendFile(path.join(__dirname, 'data management.html'));
            }
        
            });
        });

  }
  else if(req.body.Book_ID == "" || req.body.Book_Name == "" || req.body.Date == "")
        {   
            res.sendFile(path.join(__dirname, 'data management.html')); 
            return 'You dont enter all';
        }

});

app.post('/remove', function (req, res) {

  var id = req.body.Book_ID_r;
  var name = req.body.Book_Name_r;
  var findId,findName;

  if( req.body.Book_ID_r != "" && req.body.Book_Name_r != "" && req.body.Date_r != "" )
  {   
      collection.findOne( { Book_ID : id , Book_Name : name } , function(err, articles) {
            findId = articles;
        
            if( findId != null )
            {   collection.remove({ Book_ID:req.body.Book_ID_r , Book_Name:req.body.Book_Name_r });
                console.log('Success')
                res.sendFile(path.join(__dirname, 'data management.html'));
            }
            else
            {   console.log('Not found in Database');
                res.sendFile(path.join(__dirname, 'data management.html'));
            }
      });
  }
  else 
        {   console.log('You dont enter all');
            res.sendFile(path.join(__dirname, 'data management.html')); 
        }

});

/*

app.post('/update', function (req, res) {

  var id = req.body.Book_ID_u;
  var name = req.body.Book_Name_u;
  console.log( id+' , '+name );
  console.log( req.body.New_book_ID+' , '+req.body.New_book_Name+' , '+req.body.New_Date );

  if( req.body.Book_ID_u != "" && req.body.Book_Name_u != "" && req.body.Date_u != "" )
  {   
      collection.findOne( { Book_ID : req.body.Book_ID_u , Book_Name : req.body.Book_Name_u } , function(err ,find){
        
        console.log(id+' : '+find.Book_ID +' , '+name+' : '+find.Book_Name);
        
        
        if( find != null )
        {   collection.update({ Book_ID:req.body.Book_ID_u , Book_Name:req.body.Book_Name_u , Date:req.body.Date_u}, { Book_ID:req.body.New_book_ID , Book_Name:req.body.New_book_Name , Date:New_Date});
            console.log('Success')
            res.sendFile(path.join(__dirname, 'data management.html'));
        }
        else
        {   console.log('Not found in Database');
            res.sendFile(path.join(__dirname, 'data management.html'));
        }


      });
  }
  else 
        {   console.log('You dont enter all');
            res.sendFile(path.join(__dirname, 'data management.html')); 
        }

});

*/
 
var server = app.listen(5555, function() {
    console.log('Web is running...');
});