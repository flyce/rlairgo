const mongoose = require('mongoose');
const config = require('../config/env');
const autoIncrement = require('mongoose-auto-increment');
/***
 * mongodb
 */
mongoose.connect(config.mongodbUri, {
    useMongoClient: true
});

const db = mongoose.connection;
autoIncrement.initialize(db); // ID auto increment

// db info listener
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log("mongodb connected!");
});

mongoose.Promise = global.Promise;

module.exports = mongoose;