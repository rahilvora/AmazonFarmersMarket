var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var customersRouter = require('./routes/customers');
var login = require('./routes/login');
var routing = require('./routes/routing');
var mongo = require('./MongoConfig');

var app = express();

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
//app.use('/shop',customersRouter);
//app.use('/login',login);

//app.use('/api/getFarmers',routes);
//app.use('/api/getAddFarmerRequests',routes);
//app.use('api/addFarmer',routes);
//app.use('/api/getProducts',routes);
//app.use('/api/getAddProductRequests',routes);
//app.use('api/addProduct',routes);
//app.use('/api/getCustomers',routes);
//app.use('/api/getAddCustomerRequests',routes);
//app.use('api/addCustomer',routes);
//app.use('/api/getDrivers',routes);
//app.use('api/addDriver',routes);
//app.use('/api/getBills',routes);
//app.use('api/getTrips',routes);

app.use('/users', users);

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