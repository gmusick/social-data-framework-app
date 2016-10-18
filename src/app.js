//set base global so require can use absolute paths

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var bodyParser = require('body-parser');
var hogan = require('hogan-express');
var app = express();

// view engine setup
app.engine('html', hogan);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('layout', 'system/layout');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(require('less-middleware')(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'assets')));

module.exports = app;
