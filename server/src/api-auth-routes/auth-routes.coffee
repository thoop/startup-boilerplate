class AuthRoutes
    bcrypt = require 'bcrypt'
    User = require '../models/user'

    @loggedIn: (req, res) ->
        res.json { loggedIn: !!req.session._id }

    @login: (req, res) ->
        return res.send 400, 'You must supply an email' if !req.body.email
        return res.send 400, 'You must supply a password' if !req.body.password

        User.findOne email: req.body.email.toLowerCase(), (err, user) ->
            return res.send 500, err.message if err
            return res.send 401, 'Incorrect email/password' if !user

            bcrypt.compare req.body.password, user.hash, (err, result) ->
                return res.send 500, "Sorry, something went wrong. We'll look into it!" if err

                if result == true
                    req.session._id = user._id.toString()
                    return res.send 200

                return res.send 401, 'Incorrect email/password'

    @logout: (req, res) ->
        req.session = null
        res.send 200

    @signup: (req, res) =>
        return res.send 400, 'You must supply an email' if !email = req.body.email
        return res.send 400, 'You must set a password' if !password = req.body.password

        User.findOne email: email.toLowerCase(), (err, user) =>
            return res.send 500, err.message if err
            return res.send 400, 'That email has already been used. Click the Login button and then Forgot Password link to retrieve your password' if user

            bcrypt.hash password, 10, (err, hash) =>
                return res.send 500, "Sorry, something went wrong. We'll look into it!" if err

                User.createNewUserAndVault
                    email: email.toLowerCase()
                    hash: hash
                    totalUploadSize: 0, (err, savedUser) =>
                        return res.send 500, err.message if err

                        fromEmail = 'me@gmail.com'
                        #send an email
                            # to: savedUser.email
                            # from: fromEmail
                            # text: "Thanks for signing up!"
                            # subject: 'Thanks for signing up!', (success, message) ->
                            #     if !success
                            #         console.log 'error sending sendgrid mail' + message

                        req.session._id = savedUser._id.toString()
                        res.send 200

    @forgotPassword: (req, res) =>
        return res.send 400, 'You must enter your email' if !req.body.email

        User.findOne email: req.body.email.toLowerCase(), (err, user) =>
            return res.send 403 if err || !user

            key = '';
            possible = 'EYZghijklmnHIJabcTUNtuv7LMPFGwxyz01VWXo23ABC6pdefD45KSqrsQR';

            for i in [0..25]
                key += possible.charAt(Math.floor(Math.random() * possible.length));

            user.passwordResetKey = key
            user.passwordResetTime = new Date
            user.save =>
                resetPasswordLink = 'http://yourwebsite.com/resetPassword/'
                fromEmail = 'me@gmail.com'
                #send an email
                    # to: user.email
                    # from: fromEmail
                    # text: 'If you did not reset your password, ignore this email.\n\nOtherwise, click here to reset your password: ' + resetPasswordLink + key
                    # subject: 'Your password reset link', (success, message) ->
                    #     if !success
                    #         console.log 'error sending mail for reset password:' + message

                res.send 200

    @resetPassword: (req, res) ->
        return res.send 400, 'You must enter your email' if !req.body.email
        return res.send 400, 'You must enter your password' if !req.body.password

        User.findOne email: req.body.email.toLowerCase(), (err, user) ->
            tenMinutesAgo = new Date((new Date).getFullYear(), (new Date).getMonth(), (new Date).getDate(), (new Date).getHours(), (new Date).getMinutes()-10, (new Date).getSeconds())
            return res.send 403, 'Wrong email or reset password key is no longer valid' if err || !user || !req.body.key || !user.passwordResetKey || user.passwordResetTime < tenMinutesAgo || user.passwordResetKey != req.body.key

            bcrypt.hash req.body.password, 10, (err, hash) ->
                return res.send 500, "Sorry, something went wrong. We'll look into it!" if err

                user.hash = hash
                user.passwordResetKey = undefined
                user.passwordResetTime = undefined
                user.save ->
                    req.session._id = user._id.toString()
                    return res.send 200


module.exports = AuthRoutes