const GoogleStrategy = require('passport-google-oauth20').Strategy; // TODO This may be GoogleStrategy
const mongoose = require('mongoose');
const User = require('./models/User');
const mongodb = require('./db/connect');

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback',
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          googleId: profile.id,
          displayName: profile.displayName,
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          image: profile.photos[0].value,
        };

        try {
          // Check if user exists
          mongodb
            .getDb()
            .db('tubular')
            .collection('users')
            .find({ googleId: profile.id })
            .toArray((err, lists) => {
              if (err) {
                // res.status(400).json({ message: err });
                console.log('error finding user');
              }
              // res.setHeader('Content-Type', 'application/json');
              // res.status(200).json(lists);

              // If they do not exists, create the user
              if (lists.length <= 0) {
                mongodb
                  .getDb()
                  .db('tubular')
                  .collection('users')
                  .insertOne(newUser);
              }
            });
        } catch (err) {
          console.log(err);
        }
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
