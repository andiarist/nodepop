var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var app = express();

// connect db
require('./lib/connectMongoose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('ejs').__express);

// global var title
app.locals.title = 'Nodepop!';


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* website routes */
app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));

/* api routes */
app.use('/apiv1/anuncios', require('./routes/apiv1/anuncios'));

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {

  if (err.array) { // validation error
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true }[0]);
    err.message = `El parámetro ${errInfo.param} ${errInfo.msg}`;
  }
  
  res.status(err.status || 500);

  if (req.originalUrl.startsWith('/apiv1/')){
    res.json({ error: err.message});
    return;
  }


  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.render('error');
});

module.exports = app;
