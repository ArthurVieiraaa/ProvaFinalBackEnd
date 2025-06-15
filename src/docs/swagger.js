const swaggerJsdoc = require('swagger-jsdoc');
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API BackEnd',
      version: '1.0.0',
      description: 'Documentação - Swagger Arthur BackEnd',
      contact: {
        name: 'Suporte API Arthur',
        email: 'suporte@backend.com'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: ''
      },
      {
        url: 'http://localhost:3000',
        description: ''
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [{
      "bearerAuth": []
    }]
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsdoc(options);
const SwaggerSpec = swaggerJsdoc(options);
console.log(JSON.stringify(SwaggerSpec, null, 2));
module.exports = specs;