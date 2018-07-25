import timestampRouter from './routes/timestamp'
import requestHeaderRouter from './routes/requestHeaderRouter'
import urlShortenerRouter from './routes/urlShortenerRoutes'
import urlShortLinkRouter from './routes/urlShortLinkRoutes'
import fileMetaDataRouter from './routes/metadataRoutes'
import sharefileRouter from './routes/sharefileRoutes'
import cookingConverterRouter from './app/metric-converter/routes/cookingConverterRoutes'
import issueTrackerRouter from './app/issueTracker/routes/trackerRoutes'
import mongoose from 'mongoose'
import helmet from 'helmet'
// import passport from 'passport'
// import session from 'express-session'
// import dotenv from "dotenv"

// // load environment variables
// dotenv.config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

//router imports
var indexRouter = require('./routes');
var usersRouter = require('./routes/users');

var app = express();

// database setup
// var mongoDB = process.env.DB_SHORTENER
// const defaultOptions = {
//   reconnectTries: Number.MAX_VALUE 
//   ,reconnectInterval:1000
// }
// mongoose.connect(mongoDB, defaultOptions)
mongoose.Promise = global.Promise
// const db = mongoose.connection
// db.on("error", console.error.bind(console, "MongoDB connection error:"))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(helmet())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(sassMiddleware({
  src: path.join(__dirname, 'public'),
  dest: path.join(__dirname, 'public'),
  indentedSyntax: false, // true = .sass and false = .scss
  sourceMap: true
}));

// serve client-side files
app.use("/public",express.static(path.join(__dirname, 'public')));
app.use("/build",express.static(path.join(__dirname, 'build')));


//set up routes
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/api/request-header", requestHeaderRouter)
app.use("/api/timestamp", timestampRouter)
app.use("/api/shorten", urlShortenerRouter)
app.use("/short", urlShortLinkRouter)
app.use("/api/metadata", fileMetaDataRouter)
app.use("/share", sharefileRouter)
app.use("/api/convert", cookingConverterRouter)
app.use("/api/tracker", issueTrackerRouter)

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

module.exports = app


