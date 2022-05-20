const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

// Initialize the database
const connection = require('./db/connect');
connection.initDatabase();

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
