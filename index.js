const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://admin:1234@ds135926.mlab.com:35926/samplecurrencydb";

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/messages',function(req, res) {
    var str = req.body.message;
    var jj = {};
    var key = sha256(str);
    //adding key to mongo db
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
      var myobj = { string: str, shakey: key };
      db.collection("shakeys").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        db.close();
      });
    });
    jj["key"] = key;
     res.send(JSON.stringify(jj));
  })
  .get('/messages/', function(req, res) {
    var str;
    MongoClient.connect(url, function(err, db) {
      if (err) throw err;
        var query = { shakey: req.query.id };
        db.collection("shakeys").find(query).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        str = result;
        db.close();
      });
    });
    res.send(str);
    //res.render('pages/index')
  })
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
