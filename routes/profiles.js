const routes = require('express').Router();
const profilesController = require('../controllers/profiles.js');
const validation = require('../middleware/validate');

// Return all of the user profiles
routes.get('/', profilesController.getAll);

// Return a single user profile
routes.get('/:id', profilesController.getSingleProfile);

// Create a new profile
routes.post('/', validation.createProfile, profilesController.createProfile);

// Delete a profile
routes.delete('/:id', profilesController.deleteProfile);

// Update a profile
routes.put('/:id', profilesController.updateProfile);

module.exports = routes;
