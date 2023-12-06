import { useState, useEffect } from 'react';
import authService from '../../services/auth.service';
import { API_ENDPOINTS } from '../../config';

const SingleMetric = () => {
  //TO DO: initialize the state to hold the data structure you expect from the backend
  const [metric, setMetric] = useState(null);
  const [error, setError] = useState(null);

  const getSingleMetric = () => {
    authService.api
      .get(API_ENDPOINTS.entries)
      .then(res => {
        console.log('res.data', res.data);
        setMetric(res.data);
      })
      .catch(err => {
        setError('Failed to load metric');
        console.log(err);
      });
  };

  useEffect(() => {
    getSingleMetric();
  }, []);

  return (
    <div className="SingleMetric">
      {error && <div className="error">{error}</div>}

      {metric && <p>The metric is {metric}</p>}
    </div>
  );
};

export default SingleMetric;
