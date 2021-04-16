const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cron = require('node-cron');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

const app = express();
const mongoose = require('mongoose');
const environment = require('./environments/environment');
require('dotenv').config();

const users_controller = require('./routes-controller/users-controller');
const mkdir_controller = require('./routes-controller/mkdir-controller');
const intuit_controller = require('./routes-controller/intuit-controller');
const transactions_locations_update_controller = require('./routes-controller/transactions_locations_update-controller');

const mongooseOptions = {
  useNewUrlParser: true,
  useFindAndModify: false,
  useCreateIndex: true,
  // useUnifiedTopology: true,
  // serverSelectionTimeoutMS: 30000
};

const corsOptions = {
  origin: function (origin, callback){
  	// console.log('ORIGIN:', origin);
    if([
    	undefined,
      'https://abc.com',
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
    // console.log('Connected to mongoDB');
    process.env.NODE_ENV === 'production' ? console.log('Connected to mongoDB (In PROD mode)') : console.log('Connected to mongoDB');
    // users_controller.createTax();
    // mkdir_controller.createMongoBackupDirectories();
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

let num = 0;
cron.schedule('* * * * *', () => {
  // console.log('Running cron every minute', ++num);
  transactions_locations_update_controller.updateTransactionsLocations();
});

// cron.schedule('* * * * * *', () => {
//   // dbAutoBackUp();
// });

cron.schedule('1 * * * *', () => {
  // console.log('CRON running: ', num++);
  users_controller.refreshQuickBooksToken();
});

cron.schedule('0 */1 * * *', () => {
  console.log('Check patroller');
  transactions_locations_update_controller.changePatrollerAssignRequests();
});

async function dbAutoBackUp(){
  console.log('Auto backup CRON start');
}

module.exports = app;
