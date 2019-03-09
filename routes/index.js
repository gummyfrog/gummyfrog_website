var express = require('express');
var path = require('path');
var router = express.Router();


class customRouter {

  constructor(cache) {
    this.express = express;
    this.path = path;
    this.router = router;

    this.app = this.express();
    this.app.use(this.express.static("/../public"));
    this.setup();
  }

  setup() {

    this.router.get('/', function(req, res){
      res.render('layout', {
        title: 'Home'
      });
    });


    this.router.get('/bolopo', function(req, res){
      res.render('bolopo', {
        title: 'Bolopo Dragonslayer',
      });
    });


    this.router.get('/emojis', function(req, res){
      res.render('emojis', {
        title: 'Twitter Data Mining'
      });
    });


    this.router.get('/resizer', function(req, res){
      res.render('resizer', {
        title: 'Instagram Image Formatter'
      });
    });

    this.router.get('/map', function(req, res){
      res.render('map', {
        title: 'Map'
      });
    });


    this.router.get('/frogeye', function(req, res){
      res.render('frogeye', {
        title: 'COMING SOON'
      });
    });

    this.router.get('/testlink2020', function(req, res){
      res.render('sandwich2020', {
        title: 'SANDWICH 2020'
      });
    });

  }

}


module.exports = customRouter;
