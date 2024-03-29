const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const mongoose = require('mongoose');
const environment = require('./environments/environment');
require('dotenv').config();

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true
};

const corsOptions = {
  origin: function (origin, callback){
    if([
    	undefined,
      'https://www.abc.com'
    ].indexOf(origin) !== -1){
      callback(null, true)
    }
    else{
      callback(new Error('Not allowed by CORS'));
    }
  }
};

mongoose.connect(`${environment.db_url}`, mongooseOptions)
.then(()=>{
    console.log('Connected to mongoDB');
    intuit_controller.makeTokenInvalidAtAppStart();
  }
).catch(err => console.error('Error to connect to mongoDB', err));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// app.use(cors());
app.use(cors(corsOptions));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use("/public", express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/api/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next){
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next){
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
