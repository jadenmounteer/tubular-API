const routes = require('express').Router();
const exercisesController = require('../controllers/exercises.js');

// Return all exercises
routes.get('/', exercisesController.getAll);

// Return a single exercise
routes.get('/:id', exercisesController.getSingleExercise);

// Create a user-added exercise
routes.post('/', exercisesController.createExercise);

// Delete a user-added exercise
routes.delete('/:id', exercisesController.deleteExercise);

module.exports = routes;
