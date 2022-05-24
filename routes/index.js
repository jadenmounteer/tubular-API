const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Tubular API');
});

routes.use('/profiles', require('./profiles'));
routes.use('/exercises', require('./exercises'));
routes.use('/api-docs', require('./swagger'));

module.exports = routes;
