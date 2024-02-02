// import axios from "axios";
import { useEffect, useState } from 'react';
import authService from '../../services/auth.service';
import { API_ENDPOINTS } from '../../config';
import EntryCard from '../../components/EntryCard.jsx/EntryCard';

function DiaryPage() {
  const [entries, setEntries] = useState([]);
  const [error, setError] = useState(null);

  const getAllEntries = () => {
    console.log(`getAllEntries called!!!!`);

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

  return EntryCardItems;

  // return (
  //   <div className="container">
  //     <h1>Diary page</h1>

  //     {error && <div className="container error">{error}</div>}

  //     {/* mapping over the state variable "entries" */}
  //     {entries &&
  //       entries.map(entry => {
  //         return (
  //           <div className="container" key={entry._id}>
  //             {/* display Entry here */}
  //             <h4>I will focus on...</h4>
  //             <p>{entry.focusPrompt}</p>
  //             <h4>I am grateful for...</h4>
  //             <p>{entry.gratefulPrompt}</p>
  //             <h4>I will let go of...</h4>
  //             <p>{entry.letGoPrompt}</p>
  //           </div>
  //         );
  //       })}
  //   </div>
  // );
}

export default DiaryPage;
