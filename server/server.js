// const app = require('./app');
import app from './app.js';
import connectDB from './db/index.js';
import logger from './logs/logger.js';

// ℹ️ Sets the PORT for our app to have access to it. If no env has been set, we hard code it to 5005
const PORT = process.env.PORT || 5005;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`Server listening on http://localhost:${PORT}`);
  });
});
