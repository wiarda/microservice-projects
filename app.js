import timestampRouter from './routes/timestamp'
import requestHeaderRouter from './routes/requestHeaderRouter'
import urlShortenerRouter from './routes/urlShortenerRoutes'
import urlShortLinkRoutes from './routes/urlShortLinkRoutes'
import fileMetaDataRoutes from './routes/metadataRoutes'
import mongoose from 'mongoose'
import dotenv from "dotenv"

// load environment variables
dotenv.config()

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var sassMiddleware = require('node-sass-middleware');

//router imports
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// database setup
var mongoDB = process.env.DB_CONNECTION
mongoose.connect(mongoDB, {
  reconnectTries: Number.MAX_VALUE 
  ,reconnectInterval:1000
  }  
)
mongoose.Promise = global.Promise
const db = mongoose.connection
db.on("error", console.error.bind(console, "MongoDB connection error:"))

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
app.use("/short", urlShortLinkRoutes)
app.use("/api/metadata", fileMetaDataRoutes)

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
