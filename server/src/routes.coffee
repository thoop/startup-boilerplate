auth = require './auth'

module.exports = (app, mongo) ->

    app.get '/', application
    app.get '/resetPassword/:key', application

application = (req, res) ->
    res.render 'application'