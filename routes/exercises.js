const routes = require('express').Router();
const exercisesController = require('../controllers/exercises.js');

// Return all exercises
routes.get('/:user_id', exercisesController.getAll);

// Return a single exercise
routes.get('/:exercise_id', exercisesController.getSingleExercise);

// Create a user-added exercise
routes.post('/', exercisesController.createExercise);

// Delete a user-added exercise
routes.delete('/:exercise_id', exercisesController.checkIfAbleToDeleteExercise);

// Update a user-added exercise
routes.put('/:exercise_id', exercisesController.updateExercise);

module.exports = routes;
