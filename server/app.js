import logger from './logs/logger.js';
import { reminderEmailJob } from './cron-jobs/reminderEmailJob.js';

process.on('uncaughtException', (err, origin) =>
  logger.error(`Caught exception: ${err}. Exception origin: ${origin}`)
);
process.on('unhandledRejection', (reason, promise) =>
  logger.error(`Unhandled rejection at ${promise}. Reason: ${reason}`)
);

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
// require('dotenv').config();
import 'dotenv/config';

// ℹ️ Connects to the database
// require('./db');
import './db/index.js';

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
// const express = require('express');
import express from 'express';

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
// require('./config')(app);
import configureApp from './config/index.js';
configureApp(app);

import { isAuthenticated } from './middleware/jwt.middleware.js';

// 👇 Start handling routes here
import indexRoutes from './routes/index.routes.js';
app.use('/api', indexRoutes);

import authRoutes from './routes/auth.routes.js';
app.use('/auth', authRoutes);

import entryRoutes from './routes/entry.routes.js';
app.use('/api', isAuthenticated, entryRoutes);

import userRoutes from './routes/user.routes.js';
app.use('/api', isAuthenticated, userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
// require('./error-handling')(app);
import errorHandling from './error-handling/index.js';
errorHandling(app);

reminderEmailJob();

export default app;
