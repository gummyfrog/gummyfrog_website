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


router.get('/contact', function(req, res){
  res.render('contact', {
    title: 'Contact'
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

router.get('/allEmojis', function(req, res){
  res.render('allEmojiPage', {
    title: 'Lots of Emoji Data'
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


module.exports = router;
