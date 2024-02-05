import { useEffect, useState } from 'react';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

function AdviceSlip() {
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
      {advice && (
        <Card className="my-4">
          <Card.Body>{advice}</Card.Body>
        </Card>
      )}

      {error && <p>{error}</p>}
    </>
  );
}

export default AdviceSlip;
