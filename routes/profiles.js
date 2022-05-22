const routes = require('express').Router();
const connect = require('../db/connect');
const profilesController = require('../controllers/profiles.js');

// Return all of the user profiles
routes.get('/', profilesController.getAll);

// Return a single user profile
routes.get('/:id', profilesController.getSingleProfile);

// Create a new profile
routes.post('/', profilesController.createProfile);

module.exports = routes;
