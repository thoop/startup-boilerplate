User = require './models/user'

class Auth
    @checkLoggedIn: (req, res, next) ->
        return res.send 401 if !req.session._id

        User.findById req.session._id, (err, user) ->
            return res.send 403 if err || !user
            req.user = user
            next()

    @hasPermissionToDoSomething: (req, res, next) ->
        return res.send 403 if !req.user

        next()


module.exports = Auth