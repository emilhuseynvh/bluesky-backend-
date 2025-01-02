const mongoose = require('mongoose');
const config = require('.');

mongoose.connect(config.databaseUrl).then(() => {
    console.log('database connect succesfully');
}).catch((err) => {
    console.log('database connection error', err);
})