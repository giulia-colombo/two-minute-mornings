const axios = require('axios');

const ADVICE_API_URL = 'https://api.adviceslip.com/advice';

async function fetchAdvice() {
  try {
    const response = await axios.get(ADVICE_API_URL);
    logger.info('response.data.slip.advice ==>', response.data.slip.advice);
    return response.data.slip.advice;
  } catch (err) {
    throw new Error(
      'Looks like we have issues fetching your affirmations... try again later!'
    );
    logger.info(err);
  }
}

fetchAdvice();
