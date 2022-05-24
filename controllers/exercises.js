const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // This is so we can query by the db ID

const getAll = async (req, res) => {
  const result = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingleExercise = async (req, res) => {
  const userId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .find({ _id: userId });
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createExercise = async (req, res) => {
  const exercise = {
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    videos: req.body.videos,
    tags: req.body.tags,
    user_added: true,
  };

  const response = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .insertOne(exercise);

  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while creating the exercise.'
      );
  }
};

const deleteExercise = async (req, res) => {
  const exerciseId = new ObjectId(req.params.id);
  const response = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .remove({ _id: exerciseId }, true);

  if (response.deletedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while deleting the exercise.'
      );
  }
};

const updateExercise = async (req, res) => {
  const exerciseId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const exercise = {
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    videos: req.body.videos,
    tags: req.body.tags,
    user_added: true,
  };
  const response = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .replaceOne({ _id: exerciseId }, exercise);

  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res
      .status(500)
      .json(
        response.error || 'Some error occurred while updating the exercise.'
      );
  }
};

module.exports = {
  getAll,
  getSingleExercise,
  createExercise,
  deleteExercise,
  updateExercise,
};
