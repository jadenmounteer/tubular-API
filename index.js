const express = require('express');
const bodyParser = require('body-parser');
const mongodb = require('./db/connect');
const cors = require('cors');
const passport = require('passport');
require('./passport')(passport);
const session = require('express-session');

const port = process.env.PORT || 3000;
const app = express();

app.use(cors());
// This makes it accessible to anyone.
// To configure options, use this tutorial: https://stackabuse.com/handling-cors-with-node-js/

// session middleware
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUnititialized: false,
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app
  .use(bodyParser.json())
  // .use((req, res, next) => {
  //   res.header('Access-Control-Allow-Origin', '*');
  //   res.header(
  //     'Access-Control-Allow-Headers',
  //     'Origin, X-Requested-With, Content-Type, Accept'
  //   );
  //   next();
  // })
  .use('/', require('./routes'))
  .use('/auth', require('.routes/auth'));

// Catch any uncaught exceptions
process.on('uncaughtException', (err, origin) => {
  console.log(
    process.stderr.fd,
    `Caught exception ${err}\n` + `Exception origin ${origin}`
  );
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
