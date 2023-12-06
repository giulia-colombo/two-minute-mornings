// const axios = require('axios');
import axios from 'axios';
import logger from '../logs/logger.js';

const ADVICE_API_URL = 'https://api.adviceslip.com/advice';

const fetchAdvice = async () => {
  try {
    const response = await axios.get(ADVICE_API_URL);
    logger.info('response.data.slip.advice ==>', response.data.slip.advice);
    return response.data.slip.advice;
  } catch (err) {
    const errorMessage =
      'Looks like we have issues fetching your affirmations... try again later!';
    logger.error(errorMessage, { originalError: err });
    throw new Error(errorMessage);
  }
};

fetchAdvice();
