const GoogleStrategy = require('passport-google-oauth20').Strategy
const User = { findOrCreate: (profile, cb) => cb(null, profile) } // Dummy user logic

module.exports = passport => {
  passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL
  }, (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate(profile, (err, user) => cb(err, user))
  }))

  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((obj, done) => done(null, obj))
} 