const routes = require('express').Router();
const connect = require('../db/connect');
const profilesController = require('../controllers/profiles.js');

// Return all of the user profiles
routes.get('/', profilesController.getAll);

// routes.get('/', (req, res) => {
//   const results = connect.getCollection().find();

//   results.toArray().then((documents) => {
//     res.status(200).json(documents);
//   });
// });

module.exports = routes;
