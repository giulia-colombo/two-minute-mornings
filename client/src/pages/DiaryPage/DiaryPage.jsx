import axios from "axios";
import { useEffect, useState } from "react";

const API_URL = "http://localhost:5005";

function DiaryPage() {
  const [entries, setEntries] = useState([]);

  const getAllEntries = () => {
    console.log(`getAllEntries called!!!!`);
    
    axios
      .get(`${API_URL}/api/entries/`)
      .then(response => {
        // console.log(`response stauts`, response.status);
        // console.log(`response headers`, response.headers);
        console.log(`response.data`, response.data);
        
        setEntries(response.data);
      })
      .catch(err => console.log(err))
  }

  useEffect(() => {
    getAllEntries();
  }, []);

    return (
      <div className="DiaryPage">
        <h1>Diary page</h1>
        
        {/* mapping over the state variable "entries" */}
        {entries && entries.map(entry => {
          return (
            <div className="Entry" key={entry._id}>
              {/* display Entry here */}
              <h4>I will focus on...</h4>
              <p>{entry.focusPrompt}</p>
              <h4>I am grateful for...</h4>
              <p>{entry.gratefulPrompt}</p>
              <h4>I will let go of...</h4>
              <p>{entry.letGoPrompt}</p>
            </div>
          )
        })}

      </div>
    );
  }
  
  export default DiaryPage;