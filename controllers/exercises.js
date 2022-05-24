const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId; // This is so we can query by the db ID

const getAll = async (req, res) => {
  const userId = new ObjectId(req.params.user_id);
  const result = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .find();
  result.toArray().then((lists) => {
    // Filter out the custom exercises that should not be visible to the user
    const filteredList = lists.filter((exercise) => {
      if (exercise.user_id == userId || exercise.user_id == 'null') {
        return exercise;
      }
    });
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(filteredList);
  });
};

const getSingleExercise = async (req, res) => {
  const exerciseId = new ObjectId(req.params.id);
  const result = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .find({ _id: exerciseId });
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
    user_id: req.body.user_id,
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

const checkIfAbleToDeleteExercise = async (req, res) => {
  const exerciseId = new ObjectId(req.params.id);

  // Get the exercise we want to delete
  const result = await mongodb
    .getDb()
    .db('tubular')
    .collection('exercises')
    .find({ _id: exerciseId });

  result.toArray().then((lists) => {
    const userId = lists[0].user_id;
    if (userId == 'null') {
      res
        .status(500)
        .json(
          result.error ||
            'This is not a user-created exercise. Unable to delete.'
        );
    } else {
      deleteExercise(exerciseId, req, res);
    }
  });
};

async function deleteExercise(exerciseId, req, res) {
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
}

const updateExercise = async (req, res) => {
  const exerciseId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const exercise = {
    name: req.body.name,
    description: req.body.description,
    images: req.body.images,
    videos: req.body.videos,
    tags: req.body.tags,
    user_id: req.body.user_id,
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
  updateExercise,
  checkIfAbleToDeleteExercise,
};
