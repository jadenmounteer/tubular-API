const routes = require('express').Router();

routes.get('/', (req, res) => {
  res.send('Hello world');
});

module.exports = routes;

// TODO: Incorporate controllers like in the professor's code:
// https://github.com/byui-cse/cse341-code-student/tree/L03-personal-solution
