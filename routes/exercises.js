const routes = require('express').Router();
const exercisesController = require('../controllers/exercises.js');
const validation = require('../middleware/validate');

// Return all exercises
routes.get('/:user_id', exercisesController.getAll);

// Return a single exercise
routes.get('/:exercise_id', exercisesController.getSingleExercise);

// Create a user-added exercise
routes.post('/', validation.createExercise, exercisesController.createExercise);

// Delete a user-added exercise
routes.delete('/:exercise_id', exercisesController.checkIfAbleToDeleteExercise);

// Update a user-added exercise
routes.put(
  '/:exercise_id',
  validation.createExercise,
  exercisesController.updateExercise
);

module.exports = routes;
