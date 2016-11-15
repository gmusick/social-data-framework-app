// set base global so require can use absolute paths

const autoprefixer = require('autoprefixer');
const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const bodyParser = require('body-parser');
const hogan = require('hogan-express');
const postcssMiddleware = require('postcss-middleware');
const sassMiddleware = require('node-sass-middleware');

const app = express();

// view engine setup
app.engine('html', hogan);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'html');
app.set('layout', 'system/layout');

// uncomment after placing your favicon in /public
// app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const buildPath = path.join(__dirname, 'assets', 'build');
app.use(sassMiddleware({
  dest: buildPath,
  includePaths: [
    path.join(__dirname, '..', 'node_modules'),
  ],
  src: path.join(__dirname, 'assets', 'sass'),
}));

app.use(postcssMiddleware({
  plugins: [
    autoprefixer({
      browsers: '> 1%, last 3 versions',
    }),
  ],
  src: req => path.join(buildPath, req.url),
}));

app.use(express.static(path.join(__dirname, 'assets', 'build')));

module.exports = app;
