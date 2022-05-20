// .env variables MONGODB_URI
const dotenv = require('dotenv');
dotenv.config();
const MongoClient = require('mongodb').MongoClient;

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }

  // process.env.MONGODB_URI
  MongoClient.connect(
    'mongodb+srv://the1shortguyfromRFM:W0oi01G2vHrodj8t@cluster0.sfayv.mongodb.net/?retryWrites=true&w=majority'
  )
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getDb = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

module.exports = {
  initDb,
  getDb,
};
