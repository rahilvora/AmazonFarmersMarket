var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');

//configure the sessions with our application


var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var customersRouter = require('./routes/customers');
//var login = require('./routes/login');
var routing = require('./routes/routing');
var mongo = require('./MongoConfig');

var app = express();


app.use(session({

  cookieName: 'session',
  secret: 'cmpe273_amazonfresh',
  duration: 30 * 60 * 1000,    //setting the time for active session
  activeDuration: 5 * 60 * 1000,  })); // setting time for the session to be active when the window is open // 5 minutes set currently


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Admin Requests
app.use('/', routes);
//app.use('/admin',routes);
app.use('/api',api);


/***Ishan's part for customers and login , signup**/
//app.use('/signup',customersRouter);
app.use('/shop',customersRouter);
//app.use('/login',login);

app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


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