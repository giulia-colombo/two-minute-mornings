// import axios from "axios";
import { useEffect, useState } from "react";
import authService from "../../services/auth.service";

function DiaryPage() {
  const [entries, setEntries] = useState([]);

  const getAllEntries = () => {
    // console.log(`getAllEntries called!!!!`);
    


   authService.api.get(`/api/entries/`).then(res => {
    console.log("res.data", res.data);
    setEntries(res.data);
   }).catch(err => console.log(err)
   )
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