const GoogleStrategy = require('passport-google-oath20').Strategy; // TODO This may be GoogleStrategy
const mongoose = require('mongoose');
const User = require('./models/User');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.Google_Client_ID,
        clientSecret: process.env.Google_Client_Secret,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        console.log(profile);
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => done(err, user));
  });
};
