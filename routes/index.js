var express = require('express');
var path = require("path");
var router = express.Router();

app = express();
app.use(express.static("/../public"));

router.get('/', function(req, res){
  res.render('index', {
    title: 'Home'
  });
});


router.get('/bolopo', function(req, res){
  res.render('bolopo', {
    title: 'Bolopo Dragonslayer'
  });
});


router.get('/emojis', function(req, res){
  res.render('emojis', {
    title: 'Twitter Data Mining'
  });
});


router.get('/resizer', function(req, res){
  res.render('resizer', {
    title: 'Instagram Image Formatter'
  });
});

router.get('/map', function(req, res){
  res.render('map', {
    title: 'Map'
  });
});


router.get('/frogeye', function(req, res){
  res.render('frogeye', {
    title: 'COMING SOON'
  });
});


module.exports = router;
