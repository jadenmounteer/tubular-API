const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const mongodb = require('./db/connect');

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
    console.log(mongodb.getDb());
  }
});
