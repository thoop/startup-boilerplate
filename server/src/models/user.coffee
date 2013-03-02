DBObject = require('./db-object')

class User extends DBObject
    mongoose = require 'mongoose'

    userSchema = new mongoose.Schema
        email: String
        hash: String

    @model = mongoose.model 'User', userSchema

module.exports = User