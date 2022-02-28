import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import scrambler from "./scrambler";

function App() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)

  //Counter passed into fetch API.
  let number = 1;

  //Fetching data and assigning to setData useState.
  useEffect(() => {
    axios(`https://api.hatchways.io/assessment/sentences/${number}`)
    .then(response => {
      
      setData(response.data.data)
    })
    .catch(error => {console.log("error fetching data")})
    .finally(setLoading(false))
  }, [])

  return (
    <div className="main-container">
      <div className="inner-container">
        <div className="sentence-and-instructions">
          <h1 className="sentence">{data && scrambler(data.sentence)}</h1>
          <span className="instructions">Guess the sentence! Start typing</span>
          <span className="instructions">
            The yellow blocks are meant for spaces
          </span>
        </div>
      </div>
    </div>
  );
}

export default App;
