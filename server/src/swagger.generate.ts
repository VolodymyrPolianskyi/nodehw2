import swaggerAutogen from 'swagger-autogen';

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server.ts', './routes/news.routes.ts']; 

const doc = {
  info: {
    title: 'News Service API',
    description: 'API documentation for the News Service microservice',
    version: '1.0.0',
  },
  host: 'nodehw2.onrender.com',
  schemes: ['/api/newsposts'],
  basePath: '/api',
};

swaggerAutogen()(outputFile, endpointsFiles, doc).then(() => {
  console.log('Swagger documentation generated!');
});
