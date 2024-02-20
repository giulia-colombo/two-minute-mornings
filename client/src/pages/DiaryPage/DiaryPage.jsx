// import axios from "axios";
import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import { API_ENDPOINTS } from '../../config';
import EntryCard from '../../components/EntryCard/EntryCard';
import Container from 'react-bootstrap/esm/Container';

function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const getAllEntries = () => {
    console.log(`getAllEntries called!!!`);

    authService.api
      .get(API_ENDPOINTS.entries)
      .then(res => {
        console.log('res.data', res.data);
        setEntries(res.data);
      })
      .catch(err => {
        setError('Failed to load entries');
        console.log(err);
      });
  };

  useEffect(() => {
    getAllEntries();
  }, []);

  const EntryCardItems = entries.map(entry => {
    return <EntryCard key={entry._id} entry={entry}></EntryCard>;
  });

  return <Container className="d-flex flex-wrap ">{EntryCardItems}</Container>;
}

export default DiaryPage;
