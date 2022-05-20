const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

const port = process.env.PORT || 3000;

app.use('/', require('./routes'));

app.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
