const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello world');
});

routes.use('/profiles', require('./profiles'));

module.exports = routes;
