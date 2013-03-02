AuthRoutes = require './api-auth-routes/auth-routes'
auth = require './auth'

module.exports = (app) ->

    app.get '/api/loggedIn', AuthRoutes.loggedIn
    
    app.post '/api/login', AuthRoutes.login

    app.post '/api/logout', AuthRoutes.logout

    app.post '/api/signup', AuthRoutes.signup

    app.post '/api/forgotPassword', AuthRoutes.forgotPassword

    app.post '/api/resetPassword', AuthRoutes.resetPassword