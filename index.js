const express = require('express')
const path = require('path')
const PORT = process.env.PORT || 5000

express()
  .use(express.static(path.join(__dirname, 'public')))
  .set('views', path.join(__dirname, 'views'))
  .set('view engine', 'ejs')
  .post('/messages',function(req, res) {
    var str = req.body.message;
    var jj = {};
    var key = sha256(str);
    jj["key"] = key;
     res.send(JSON.stringify(jj));
  })
  .get('/messages/', function(req, res) {
    res.render('pages/index')
  })
  .get('/', (req, res) => res.render('pages/index'))
  .listen(PORT, () => console.log(`Listening on ${ PORT }`))
