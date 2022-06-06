const routes = require('express').Router();
const passport = require('passport');
const { authenticate } = require('passport/lib');

// @desc Auth with Google
// @route GET /auth/google
routes.get('/google', passport.authenticate('google', { scope: ['profile'] }));

// @desc Google auth callback
// @route GET /auth/google/callback
// TODO may need to change where I am being redirected here
routes.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);

module.exports = routes;
