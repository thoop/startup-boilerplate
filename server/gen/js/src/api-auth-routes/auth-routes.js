(function() {
  var AuthRoutes;

  AuthRoutes = (function() {
    var User, bcrypt;

    function AuthRoutes() {}

    bcrypt = require('bcrypt');

    User = require('../models/user');

    AuthRoutes.loggedIn = function(req, res) {
      return res.json({
        loggedIn: !!req.session._id
      });
    };

    AuthRoutes.login = function(req, res) {
      if (!req.body.email) {
        return res.send(400, 'You must supply an email');
      }
      if (!req.body.password) {
        return res.send(400, 'You must supply a password');
      }
      return User.findOne({
        email: req.body.email.toLowerCase()
      }, function(err, user) {
        if (err) {
          return res.send(500, err.message);
        }
        if (!user) {
          return res.send(401, 'Incorrect email/password');
        }
        return bcrypt.compare(req.body.password, user.hash, function(err, result) {
          if (err) {
            return res.send(500, "Sorry, something went wrong. We'll look into it!");
          }
          if (result === true) {
            req.session._id = user._id.toString();
            return res.send(200);
          }
          return res.send(401, 'Incorrect email/password');
        });
      });
    };

    AuthRoutes.logout = function(req, res) {
      req.session = null;
      return res.send(200);
    };

    AuthRoutes.signup = function(req, res) {
      var email, password;
      if (!(email = req.body.email)) {
        return res.send(400, 'You must supply an email');
      }
      if (!(password = req.body.password)) {
        return res.send(400, 'You must set a password');
      }
      return User.findOne({
        email: email.toLowerCase()
      }, function(err, user) {
        if (err) {
          return res.send(500, err.message);
        }
        if (user) {
          return res.send(400, 'That email has already been used. Click the Login button and then Forgot Password link to retrieve your password');
        }
        return bcrypt.hash(password, 10, function(err, hash) {
          if (err) {
            return res.send(500, "Sorry, something went wrong. We'll look into it!");
          }
          return User.createNewUserAndVault({
            email: email.toLowerCase(),
            hash: hash,
            totalUploadSize: 0
          }, function(err, savedUser) {
            var fromEmail;
            if (err) {
              return res.send(500, err.message);
            }
            fromEmail = 'me@gmail.com';
            req.session._id = savedUser._id.toString();
            return res.send(200);
          });
        });
      });
    };

    AuthRoutes.forgotPassword = function(req, res) {
      if (!req.body.email) {
        return res.send(400, 'You must enter your email');
      }
      return User.findOne({
        email: req.body.email.toLowerCase()
      }, function(err, user) {
        var i, key, possible, _i;
        if (err || !user) {
          return res.send(403);
        }
        key = '';
        possible = 'EYZghijklmnHIJabcTUNtuv7LMPFGwxyz01VWXo23ABC6pdefD45KSqrsQR';
        for (i = _i = 0; _i <= 25; i = ++_i) {
          key += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        user.passwordResetKey = key;
        user.passwordResetTime = new Date;
        return user.save(function() {
          var fromEmail, resetPasswordLink;
          resetPasswordLink = 'http://yourwebsite.com/resetPassword/';
          fromEmail = 'me@gmail.com';
          return res.send(200);
        });
      });
    };

    AuthRoutes.resetPassword = function(req, res) {
      if (!req.body.email) {
        return res.send(400, 'You must enter your email');
      }
      if (!req.body.password) {
        return res.send(400, 'You must enter your password');
      }
      return User.findOne({
        email: req.body.email.toLowerCase()
      }, function(err, user) {
        var tenMinutesAgo;
        tenMinutesAgo = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), (new Date).getHours(), (new Date).getMinutes() - 10, (new Date).getSeconds());
        if (err || !user || !req.body.key || !user.passwordResetKey || user.passwordResetTime < tenMinutesAgo || user.passwordResetKey !== req.body.key) {
          return res.send(403, 'Wrong email or reset password key is no longer valid');
        }
        return bcrypt.hash(req.body.password, 10, function(err, hash) {
          if (err) {
            return res.send(500, "Sorry, something went wrong. We'll look into it!");
          }
          user.hash = hash;
          user.passwordResetKey = void 0;
          user.passwordResetTime = void 0;
          return user.save(function() {
            req.session._id = user._id.toString();
            return res.send(200);
          });
        });
      });
    };

    return AuthRoutes;

  }).call(this);

  module.exports = AuthRoutes;

}).call(this);
