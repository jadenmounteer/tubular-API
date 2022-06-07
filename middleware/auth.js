// This middleware can be inserted into a route to make sure the user is logged in before being able to access that page or data
module.exports = {
  ensureAuth: function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.redirect('/');
    }
  },
  ensureGuest: function (req, res, next) {
    if (req.isAuthenticated()) {
      // Redirect the user to a screen
    } else {
      return next();
    }
  },
};
