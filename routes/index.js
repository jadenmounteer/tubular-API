const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = routes;
