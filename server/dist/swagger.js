import swaggerAutogen from 'swagger-autogen';
import dotenv from 'dotenv';
dotenv.config();
const doc = {
    info: {
        title: 'NewsPost API',
        description: 'API documentation for NewsPost service',
    },
    host: `localhost:5432`,
    schemes: ['http'],
};
const outputFile = './swagger-output.json';
const endpointsFiles = ['./server.js', './routes/news.routes.js'];
(async () => {
    await swaggerAutogen()(outputFile, endpointsFiles, doc);
})();
