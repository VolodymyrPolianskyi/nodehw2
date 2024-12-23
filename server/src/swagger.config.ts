import { Express } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import swaggerDocument from './swagger_output.json';

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'News Service API',
    version: '1.0.0',
    description: 'API documentation for the News Service microservice',
  },
  servers: [
    {
      url: 'https://nodehw2.onrender.com',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./src/routes/news.routes.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export const setupSwagger = (app: Express) => {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
