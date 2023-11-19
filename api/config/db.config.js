
const mongoose = require('mongoose');

const mongodbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/legion-perdida';

mongoose.connect(mongodbUri)
    .then(() => console.info(`Connected to database ${mongodbUri}`))
    .catch(error => console.error(`An error ocurred trying to connect to database ${mongodbUri}`, error));

    

    