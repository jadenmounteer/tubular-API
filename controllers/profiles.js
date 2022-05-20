const { restart } = require('nodemon');
const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // This is so we can query by the db ID

const getAll = async (req, res) => {
  //console.log(mongodb.getDb().db());
  const result = await mongodb
    .getDb()
    .db('tubular')
    .collection('user_profiles')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

module.exports = {
  getAll,
};
