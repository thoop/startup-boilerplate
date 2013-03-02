(function() {
  var UserRoutes;

  UserRoutes = (function() {
    var User;

    function UserRoutes() {}

    User = require('../models/user');

    UserRoutes.doSomething = function(req, res) {
      return res.json(req.user);
    };

    return UserRoutes;

  })();

  module.exports = UserRoutes;

}).call(this);
