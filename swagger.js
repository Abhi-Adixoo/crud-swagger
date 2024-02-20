const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CRUD API Documentation',
      version: '1.0.0',
      description: 'Documentation for the CRUD API created using Node.js, Express, and MongoDB.',
    },
    servers: [
      {
        url: 'http://localhost:9000', // Change the URL based on your server configuration
        description: 'Local server',
      },
    ],
  },
  apis: ['./routes/*.js'], // Path to the API routes directory
};

const specs = swaggerJsdoc(options);

module.exports = {
  serve: swaggerUi.serve,
  setup: swaggerUi.setup(specs),
};
