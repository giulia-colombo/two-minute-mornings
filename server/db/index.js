// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
// const mongoose = require('mongoose');
import mongoose from 'mongoose';
import logger from '../logs/logger.js';

// ℹ️ Sets the MongoDB URI for our app to have access to it.
// If no env has been set, we dynamically set it to whatever the folder name was upon the creation of the app

const MONGO_URI =
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/two-minute-mornings';

// mongoose
//   .connect(MONGO_URI)
//   .then(x => {
//     const dbName = x.connections[0].name;
//     logger.info(`Connected to Mongo! Database name: "${dbName}"`);
//   })
//   .catch(err => {
//     logger.error('Error connecting to mongo: ', err);
//   });

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(MONGO_URI);
    const dbName = connection.connections[0].name;
    logger.info(`Connected to Mongo! Database name: "${dbName}"`);
  } catch (err) {
    logger.error(`Error connecting to Mongo: `, err);
  }
};

export default connectDB;
