(function() {
  var DBObject, User,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  DBObject = require('./db-object');

  User = (function(_super) {
    var mongoose, userSchema;

    __extends(User, _super);

    function User() {
      return User.__super__.constructor.apply(this, arguments);
    }

    mongoose = require('mongoose');

    userSchema = new mongoose.Schema({
      email: String,
      hash: String
    });

    User.model = mongoose.model('User', userSchema);

    return User;

  })(DBObject);

  module.exports = User;

}).call(this);
