const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const userModel = require('./models').user;

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (payload, done) => {
        userModel.findOne({
            where: {
                email: payload.email
            }
        })
        .then((user) => {
            if(!user) return done(null, false)
            else return done(null, user)
        })
        .catch((error) => {
            console.error(error);
            return done(error);
        })
    }))
}