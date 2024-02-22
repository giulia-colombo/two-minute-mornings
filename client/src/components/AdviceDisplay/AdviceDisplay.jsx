import { useEffect, useState } from 'react';
import axios from 'axios';
import CardDisplay from '../CardDisplay/CardDisplay';

function AdviceDisplay() {
  const ADVICE_API_URL = 'https://api.adviceslip.com/advice';
  const [advice, setAdvice] = useState(null);
  const [error, setError] = useState(null);

  const getAdvice = () => {
    console.log(`getAdvice called!!!`);

    axios
      .get(ADVICE_API_URL)
      .then(res => {
        console.log(`res.data.slip.advice`, res.data.slip.advice);
        setAdvice(res.data.slip.advice);
      })
      .catch(err => {
        setError('Failed to load advice.');
        console.log(err);
      });
  };

  useEffect(() => {
    getAdvice();
  }, []);

  return (
    <>
      <CardDisplay
        cardTitle={'A piece of advice for you'}
        content={advice}
        error={error}
      ></CardDisplay>
    </>
  );
}

export default AdviceDisplay;
