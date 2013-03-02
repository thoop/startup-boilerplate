class DBObject
    _ = require 'underscore'
    mongoose = require 'mongoose'

    objSchema = new mongoose.Schema
        name: String
        
    @model = mongoose.model 'DBObject', objSchema

    @create: (attributes, callback) ->
        obj = new @model
        _.extend(obj, attributes)
        obj.save callback || attributes

    @findById: (id, callback) ->
        @model.findById id, callback

    @findByIdAndUpdate: (id, update, callback) ->
        @model.findByIdAndUpdate id, update, callback

    @findOne: (params, callback) ->
        @model.findOne params, callback

    @find: (params, callback) ->
        @model.find params, callback

    @count: (params, callback) ->
        @model.count params, callback

module.exports = DBObject