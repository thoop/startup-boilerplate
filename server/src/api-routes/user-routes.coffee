class UserRoutes
    User = require '../models/user'

    @doSomething: (req, res) ->
        res.json req.user

module.exports = UserRoutes