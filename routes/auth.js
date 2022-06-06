const routes = require('express').Router();
const passport = require('passport');
const { authenticate } = require('passport/lib');

// @desc Auth with Google
// @route GET /auth/google
routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google auth callback
// @route GET /auth/google/callback
routes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    // TODO may need to change where I am being redirected here
    //res.redirect('/dashboard');
    console.log('logged in');
  }
);

module.exports = routes;
