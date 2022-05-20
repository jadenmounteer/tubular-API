// .env variables MONGODB_URI
const dotenv = require('dotenv');
dotenv.config();

// Database code
const MongoClient = require('mongodb').MongoClient;

let _client;
let _collection;

const initDatabase = () => {
  MongoClient.connect(process.env.MONGODB_URI, (err, client) => {
    if (err) throw err;
    _client = client;
    _collection = client.db('tubular').collection('user_profiles');
    console.log('DB connected successfully');
  });
};

const getCollection = () => {
  return _collection;
};

module.exports = { initDatabase, getCollection };
