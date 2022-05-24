const routes = require('express').Router();
const exercisesController = require('../controllers/exercises.js');

// Return all exercises
routes.get('/', exercisesController.getAll);

module.exports = routes;
