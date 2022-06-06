const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the Tubular API');
});

routes.use('/profiles', require('./profiles'));
routes.use('/exercises', require('./exercises'));
routes.use('/api-docs', require('./swagger'));
routes.use('/auth', require('./auth'));
// TODO I may be able to include the auth route here rather than in my main file

module.exports = routes;
