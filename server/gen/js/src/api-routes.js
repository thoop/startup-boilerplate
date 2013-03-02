(function() {
  var UserRoutes, auth;

  auth = require('./auth');

  UserRoutes = require('./api-routes/user-routes');

  module.exports = function(app) {
    return app.get('/api/doSomething/', auth.checkLoggedIn, auth.hasPermissionToDoSomething, UserRoutes.doSomething);
  };

}).call(this);
