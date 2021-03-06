const express = require('express');
const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
require('dotenv').config();

const router = express.Router();

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API challenge Esto es',
    version: '1.0.0'
  },
  servers: [{ url: process.env.URL_API }]
};

const options = {
  swaggerDefinition,
  apis: [`${__dirname}/*.js`]
};

const swaggerSpec = swaggerJSDoc(options);

router.use('/', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

module.exports = router;
