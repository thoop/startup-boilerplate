(function() {
  var app, express, http, mongoose;

  express = require('express');

  http = require('http');

  mongoose = require('mongoose');

  app = express();

  console.log(__dirname + '/../../../views');

  app.configure(function() {
    mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/test');
    app.set('port', process.env.PORT || 3001);
    app.set('view engine', 'jade');
    app.set('views', __dirname + '/../../../views');
    app.use(express.logger('dev'));
    app.use(express.compress());
    app.use(express.cookieParser());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(express.cookieSession({
      secret: 'CHANGEME'
    }));
    return app.use(express["static"](__dirname + '/../../../../client/dist'));
  });

  require('./api-auth-routes')(app);

  require('./api-routes')(app);

  require('./routes')(app);

  http.createServer(app).listen(app.get('port'), function() {
    return console.log('listening on port ' + app.get('port'));
  });

}).call(this);
