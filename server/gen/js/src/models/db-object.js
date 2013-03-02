(function() {
  var DBObject;

  DBObject = (function() {
    var mongoose, objSchema, _;

    function DBObject() {}

    _ = require('underscore');

    mongoose = require('mongoose');

    objSchema = new mongoose.Schema({
      name: String
    });

    DBObject.model = mongoose.model('DBObject', objSchema);

    DBObject.create = function(attributes, callback) {
      var obj;
      obj = new this.model;
      _.extend(obj, attributes);
      return obj.save(callback || attributes);
    };

    DBObject.findById = function(id, callback) {
      return this.model.findById(id, callback);
    };

    DBObject.findByIdAndUpdate = function(id, update, callback) {
      return this.model.findByIdAndUpdate(id, update, callback);
    };

    DBObject.findOne = function(params, callback) {
      return this.model.findOne(params, callback);
    };

    DBObject.find = function(params, callback) {
      return this.model.find(params, callback);
    };

    DBObject.count = function(params, callback) {
      return this.model.count(params, callback);
    };

    return DBObject;

  })();

  module.exports = DBObject;

}).call(this);
