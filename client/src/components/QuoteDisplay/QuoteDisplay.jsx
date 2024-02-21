import { useEffect, useState } from 'react';
import axios from 'axios';
import CardDisplay from '../CardDisplay/CardDisplay';

function QuoteDisplay() {
  const QUOTE_API_URL = 'https://zenquotes.io/api/random';
  const [quote, setQuote] = useState(null);
  const [error, setError] = useState(null);

  const getQuote = () => {
    console.log(`getAdvice called!!!`);

    axios
      .get(QUOTE_API_URL)
      .then(res => {
        console.log(`res.data.Q`, res.data.Q);
        setQuote(res.data.Q);
      })
      .catch(err => {
        setError('Failed to load advice.');
        console.log(err);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  return (
    <>
      <CardDisplay content={quote} error={error}></CardDisplay>
    </>
  );
}

export default QuoteDisplay;
