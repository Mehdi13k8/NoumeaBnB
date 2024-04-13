var createError = require('http-errors');
var express = require('express');
var connectDB = require('./db'); // Assuming the db.js file is in the same directory
require('dotenv').config()

// Connect to Database
connectDB();

var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var PORT = process.env.PORT || 5000;

var app = express();
var cors = require('cors');
app.use(cors());
// app.use(cors({
//   origin: '*:3000', // Adjust this to match your front-end URL
//   credentials: true
// }));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

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
