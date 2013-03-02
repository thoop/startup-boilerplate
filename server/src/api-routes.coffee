auth = require './auth'
UserRoutes = require './api-routes/user-routes'

module.exports = (app) ->

    app.get '/api/doSomething/',
        auth.checkLoggedIn
        auth.hasPermissionToDoSomething
        UserRoutes.doSomething
