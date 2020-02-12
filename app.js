var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var stylus = require('stylus');
var fs = require('fs');

var Index = require('./routes/index');
var app = express();

const index = new Index();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

app.use(stylus.middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/node_jszip', express.static(__dirname + '/node_modules/jszip/'));
app.use('/node_sylb-haiku', express.static(__dirname + '/node_modules/sylb-haiku/'));

app.use('/', index.router);

// catch 404 and forward to error handler

app.get('/smashjson', (req, res) => {
	var files = fs.readdirSync("./public/smashjson")
	var filenames = [];
	files.forEach((file) => {
		if(file != ".DS_Store") {
			filenames.push(file);
		}
	})

	res.send(filenames)
})

app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function(err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
