import swaggerJsdoc from 'swagger-jsdoc';

export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Telecom API Documentation',
      version: '0.1.0',
      description: 'API documentation for the Telecom application',
    },
    servers: [
      {
        url: process.env.TELECOM_SERVER_URL || 'http://localhost:4444',
        description: 'local server',
      },
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
  },
  apis: ['./routes/*.js'],
};

export const specs = swaggerJsdoc(options);
