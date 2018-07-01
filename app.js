import timestampRouter from './routes/timestamp'
import requestHeaderRouter from './routes/requestHeaderRouter'

import mongoose from 'mongoose'
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

//router imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
import timestampRouter from './routes/timestamp'
import urlShortenerRouter from './routes/urlShortenerRoutes'

var app = express();

// database setup
var mongoDB = "mongodb://<dbuser>:<dbpassword>@ds125041.mlab.com:25041/api-projects-url-shortener"

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: true, // true = .sass and false = .scss
  sourceMap: true
}));
app.use(express.static(path.join(__dirname, 'public')));

//set up routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/request-header", requestHeaderRouter)
app.use("/api/timestamp", timestampRouter)
app.use("/api/shorten", urlShortenerRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
