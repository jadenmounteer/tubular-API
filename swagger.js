const swaggerAutogen = require('swagger-autogen')();

// TODO May need to change the host when I publish to Heroku
// https://tubular-backend.herokuapp.com
const doc = {
  info: {
    title: 'Tubular API',
    description:
      'The Tubular API allows you to create user profiles, view an extensive library of exercises, and create your own exercises!',
  },
  host: 'tubular-backend.herokuapp.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// generate swagger.json
swaggerAutogen(outputFile, endpointsFiles, doc);

// Run server after it gets generated
// swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
//   await import('./index.js');
// });
