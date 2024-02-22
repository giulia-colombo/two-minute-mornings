import { useEffect, useState } from 'react';
import axios from 'axios';
import CardDisplay from '../CardDisplay/CardDisplay';

function QuoteDisplay() {
  const QUOTE_API_URL =
    'https://api.quotable.io/quotes/random?tags=love|happiness|wisdom|friendship';
  const [quote, setQuote] = useState({ content: null, author: null });
  const [error, setError] = useState(null);

  const getQuote = () => {
    console.log(`getQuote called!!!`);

    axios
      .get(QUOTE_API_URL)
      .then(res => {
        console.log(`res.data[0]`, res.data[0]);
        setQuote({ content: res.data[0].content, author: res.data[0].author });
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
      <CardDisplay
        content={quote.content}
        author={quote.author}
        error={error}
      ></CardDisplay>
    </>
  );
}

export default QuoteDisplay;
