'use strict'

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var uuid = require('uuid');
var MongoStore = require('connect-mongo')(session);
var cors = require('cors');

process.env.SESSION_SECRET || require('dotenv').load();

var passport = require('./lib/passport');

var routes = require('./routes/index');
var users = require('./routes/users');
var courses = require('./routes/courses');
var reviews = require('./routes/reviews');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(cors({
  origin: ['http://localhost:5000', 'http://gotwilk890.github.io'],
  credentials: true
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
  secret : process.env.SESSION_SECRET,
  resave : false,
  saveUninitialized : false,
  store : new MongoStore({
    url : process.env.MONGOLAB_URI
  }),
  cookie : {
    maxAge : 1800000 // 30 minutes
  },
  genid : function() {
    return uuid.v4({
      rng : uuid.nodeRNG
    });
  }
}));

app.use(passport.initialize());

app.use(passport.session());

app.use('/', routes);
app.use('/users', users);
app.use('/courses', courses);
app.use('/reviews', reviews);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;
