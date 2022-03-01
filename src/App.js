import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import scrambler from "./scrambler";
import {rowCount, columnCount} from "./sentenceParser"

function App() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  const [rows, setRows] = useState(0)

  //Counter passed into fetch API.
  let number = 1;
  // console.log(data.sentence[data.sentence.length - 1]);

  //Fetching data and assigning to setData useState.
  useEffect(() => {
    axios(`https://api.hatchways.io/assessment/sentences/${number}`)
    .then(response => {
      setData(response.data.data)
      setRows(rowCount(data.sentence));
    })
    .catch(error => {console.log("error fetching data")})
    .finally(setLoading(false))
  }, [])

  console.log();

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
        <div className="guess-container">
          {data &&
            data.sentence.split("").map((el) => {
              return (
                <div className="word">
                  {el &&
                    el.split("").map((lett) => {
                      return (
                      (lett == " " ? <div className="space">{lett}Space</div> : 
                      <div className="letter">{lett}</div>
                      )
                      )
                    })}
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default App;
