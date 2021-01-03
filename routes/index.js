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

		this.router.get('/portfolio', function(req, res){
			res.render('portfolio', {
				title: 'Fons Signatus',
				description: 'Fons Signatus'
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

		this.router.get('/cartesian', function(req, res){
			res.render('cartesian', {
				title: 'cartesian',
				description: ' '
			});
		});
	}

}


module.exports = customRouter;
