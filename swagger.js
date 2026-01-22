const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'E-commerce API',
        description: 'Week 3 Project',
    },
    host: 'localhost:8080',
    schemes: ['http'],
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
