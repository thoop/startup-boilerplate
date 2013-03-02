(function() {
  var Auth, User;

  User = require('./models/user');

  Auth = (function() {

    function Auth() {}

    Auth.checkLoggedIn = function(req, res, next) {
      if (!req.session._id) {
        return res.send(401);
      }
      return User.findById(req.session._id, function(err, user) {
        if (err || !user) {
          return res.send(403);
        }
        req.user = user;
        return next();
      });
    };

    Auth.hasPermissionToDoSomething = function(req, res, next) {
      if (!req.user) {
        return res.send(403);
      }
      return next();
    };

    return Auth;

  })();

  module.exports = Auth;

}).call(this);
