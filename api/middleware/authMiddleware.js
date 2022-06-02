const passport = require('passport');
const httpStatus = require('http-status');


module.exports = (req, res, next) => {
    passport.authenticate('jwt', (error, user, info) => {
        if(error) {
            return next(error)
        }
        if(!user) {
            return res.status(httpStatus.UNAUTHORIZED).json({
                message: "User authorization required !!!",
                responseCode: httpStatus.UNAUTHORIZED
            })
        }
        req.user = user;
        return next();
    })(req, res, next);
}