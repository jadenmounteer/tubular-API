const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // This is so we can query by the db ID

const getAll = async (req, res) => {
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

const getSingleProfile = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('tubular')
    .collection('user_profiles')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createProfile = async (req, res) => {
  const profile = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  };

  const response = await mongodb
    .getDb()
    .db('tubular')
    .collection('user_profiles')
    .insertOne(profile);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while creating the profile.'
      );
  }
};

const deleteProfile = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('tubular')
    .collection('user_profiles')
    .remove({ _id: userId }, true);

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while deleting the profile.'
      );
  }
};

const updateProfile = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const profile = {
    userName: req.body.userName,
    password: req.body.password,
    email: req.body.email,
  };
  const response = await mongodb
    .getDb()
    .db('tubular')
    .collection('user_profiles')
    .replaceOne({ _id: userId }, profile);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while updating the profile.'
      );
  }
};

module.exports = {
  getAll,
  getSingleProfile,
  createProfile,
  deleteProfile,
  updateProfile,
};
