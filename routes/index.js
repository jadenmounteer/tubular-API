const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Tubular API');
});

routes.use('/profiles', require('./profiles'));

module.exports = routes;
