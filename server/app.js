process.on('uncaughtException', (err, origin) =>
  logger.error(`Caught exception: ${err}. Exception origin: ${origin}`)
);
process.on('unhandledRejection', (reason, promise) =>
  logger.error(`Unhandled rejection at ${promise}. Reason: ${reason}`)
);

// ℹ️ Gets access to environment variables/settings
// https://www.npmjs.com/package/dotenv
require('dotenv').config();

// ℹ️ Connects to the database
require('./db');

// Handles http requests (express is node js framework)
// https://www.npmjs.com/package/express
const express = require('express');

const app = express();

// ℹ️ This function is getting exported from the config folder. It runs most pieces of middleware
require('./config')(app);

const { isAuthenticated } = require('./middleware/jwt.middleware');

// 👇 Start handling routes here
const indexRoutes = require('./routes/index.routes');
app.use('/api', indexRoutes);

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const entryRoutes = require('./routes/entry.routes');
app.use('/api', isAuthenticated, entryRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/api', isAuthenticated, userRoutes);

// ❗ To handle errors. Routes that don't exist or errors that you handle in specific routes
require('./error-handling')(app);

import { Logger } from 'winston';
import { reminderEmailJob } from './cron-jobs/reminderEmailJob';
import logger from './logs/logger';
reminderEmailJob();

module.exports = app;
