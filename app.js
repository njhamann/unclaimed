
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , api = require('./routes/api')
  , http = require('http')
  , mongoose = require('mongoose')
  , path = require('path');

var app = express();

//mongo
mongoose.connect('localhost', 'unclaimed'); 
var db = mongoose.connection;                                    
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function callback() {                            
    console.log('Connected to DB'); 
});                                                              

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon(__dirname + '/public/images/favicon.ico')); 
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
app.use(app.router);

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

//routes
app.get('/', routes.index);
app.post('/api/save', api.save);
app.get('/api/get/:id', api.get);
app.get('*', routes.index);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
