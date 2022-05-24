const routes = require('express').Router();
const exercisesController = require('../controllers/exercises.js');

// Return all exercises
routes.get('/', exercisesController.getAll);

// Return a single exercise
routes.get('/:id', exercisesController.getSingleExercise);

// Create a new exercise
routes.post('/', exercisesController.createExercise);

module.exports = routes;
