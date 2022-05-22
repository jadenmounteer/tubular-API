const swaggerAutogen = require('swagger-autogen')();

// TODO May need to change the host when I publish to Heroku
// https://tubular-backend.herokuapp.com
const doc = {
  info: {
    title: 'Contacts API',
    description: 'Contacts API',
  },
  host: 'https://tubular-backend.herokuapp.com',
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
