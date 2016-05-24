var throng = require('throng');

var WORKERS = process.env.WEB_CONCURRENCY || 1;
var PORT = process.env.PORT || 3000;

throng({
  workers: WORKERS,
  grace: 1000,  
  lifetime: Infinity,
  start: start
});

function start(id) {
   var express = require('express');
   var path = require('path');
   var favicon = require('serve-favicon');
   var logger = require('morgan');
   var cookieParser = require('cookie-parser');
   var bodyParser = require('body-parser');

   var routes = require('./routes/index');
   var users = require('./routes/users');
   var videos = require('./routes/videos');

   var app = express();

   // view engine setup
   app.set('views', path.join(__dirname, 'views'));
   app.set('view engine', 'jade');

   
   app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
   app.use(logger('dev'));
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: false }));
   app.use(cookieParser());
   app.use(express.static(path.join(__dirname, 'public')));

   app.use('/', routes);
   app.use('/users', users);
   app.use('/api/videos', videos);

   // Catch 404 and forward to error handler.
   app.use(function(req, res, next) {
     var err = new Error('Not Found');
     err.status = 404;
     next(err);
   });

   // error handlers
   if (app.get('env') === 'development') {
      /* Development error handler, will print stacktrace. */
     app.use(function(err, req, res, next) {
       res.status(err.status || 500);
       res.render('error', {
         message: err.message,
         error: err
       });
     });
   } else {
      /* Production error handler, no stacktraces leaked to user. */
      app.use(function(err, req, res, next) {
         res.status(err.status || 500);
         res.render('error', {
            message: err.message,
            error: {}
         });
      });
   }

   app.listen(PORT, onListen);

   function onListen() {      
      console.log('Started worker ', id);
      console.log('Listening on ', PORT);
   }
 }