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
			res.render('index', {
				title: 'Fons Signatus',
				description: 'Fons Signatus'
			});
		});

		this.router.get('/bolopo', function(req, res){
			res.render('bolopo', {
				title: 'Bolopo Dragonslayer',
				description: 'page about making haikus programatically'
			});
		});

		this.router.get('/emojis', function(req, res){
			res.render('emojis', {
				title: 'Twitter Data Mining',
				description: 'associating emojis with words based on data collected from twitter'
			});
		});

		this.router.get('/resizer', function(req, res){
			res.render('resizer', {
				title: 'Instagram Image Formatter',
				description: 'aspect-ratio fit images into a square'
			});
		});

		this.router.get('/map', function(req, res){
			res.render('map', {
				title: 'Map',
				description: 'what is this page'
			});
		});

		this.router.get('/cw_faq', function(req, res){
			res.render('cw_faq', {
				title: 'Cuck Watch FAQ',
				description: 'faq for Cuck Watch'
			});
		});

		this.router.get('/cw_faq_br', function(req, res){
			res.render('cw_faq_br', {
				title: 'Corno Patrulha FAQ',
				description: 'faq for Corno Patrol'
			});
		});

		this.router.get('/auditype', function(req, res){
			res.render('auditype', {
				title: 'Auditype',
				description: ' '
			});
		});

		this.router.get('/privacy', function(req, res){
			res.render('privacy', {
				title: 'Privacy Policy',
				description: ' '
			});
		});

		this.router.get('/contact', function(req, res){
			res.render('contact', {
				title: 'Contact',
				description: ' '
			});
		});

		this.router.get('/mail', function(req, res){
			res.render('mail', {
				title: 'mail',
				description: 'mail thing'
			});
		});

		this.router.get('/cartesian', function(req, res){
			res.render('cartesian', {
				title: 'cartesian',
				description: ' '
			});
		});

    this.router.get('/smashdata', function(req, res){
      res.render('smashdata', {
        title: 'Smashing!',
        description: ' '
      });
    });


	}

}


module.exports = customRouter;
