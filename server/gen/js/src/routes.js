(function() {
  var application, auth;

  auth = require('./auth');

  module.exports = function(app, mongo) {
    app.get('/', application);
    return app.get('/resetPassword/:key', application);
  };

  application = function(req, res) {
    return res.render('application');
  };

}).call(this);
