import { useEffect, useState } from 'react';
import axios from 'axios';
import CardDisplay from '../CardDisplay/CardDisplay';

function ActivityDisplay() {
  const ACTIVITY_API_URL =
    'https://www.boredapi.com/api/activity?participants=1';
  const [activity, setActivity] = useState(null);
  const [error, setError] = useState(null);

  const getActivity = () => {
    console.log(`getActivity called!!!`);

    axios
      .get(ACTIVITY_API_URL)
      .then(res => {
        console.log(`res.data.activity`, res.data.activity);
        setActivity(res.data.activity + '.');
      })
      .catch(err => {
        setError('Failed to load advice.');
        console.log(err);
      });
  };

  useEffect(() => {
    getActivity();
  }, []);

  return (
    <>
      <CardDisplay
        cardTitle={"Bored & don't know what to do?"}
        content={activity}
        error={error}
      ></CardDisplay>
    </>
  );
}

export default ActivityDisplay;
