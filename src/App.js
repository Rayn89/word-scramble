import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import scrambler from "./scrambler";
import {rowCount, columnCount} from "./sentenceParser"

function App() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)
  const [word, setWord] = useState('')
  let newNum = useRef(1)
  const score = useRef(0)
  const savedWord = useRef();

  //Counter passed into fetch API.
  let number = 1;


  //Fetching data and assigning to setData useState.
  useEffect(() => {
    axios(`https://api.hatchways.io/assessment/sentences/${newNum.current}`)
    .then(response => {
      setData(response.data.data)
    })
    .catch(error => {console.log("error fetching data")})
    .finally(setLoading(false))
  }, [])


  //Splitting the string received from fetch, keeping the space.
  let scrambled;
  let newWord;
  if(data){
    scrambled = scrambler(data.sentence);
    savedWord.current = scrambled;
    newWord = (
    scrambled.split(/(\S+\s+)/).filter(function (n) {
      return n;
    })
    );
  }

  return (
    <div className="main-container">
      <div className="inner-container">
        <div className="sentence-and-instructions">
          <h1 className="sentence">{data && scrambled}</h1>
          <span className="instructions">Guess the sentence! Start typing</span>
          <span className="instructions">
            The yellow blocks are meant for spaces
          </span>
        </div>
        <div>
          Score: {score.current}
        </div>
        <div className="guess-container">
          {data &&
            newWord.map((el) => {
              
              return (
                <div className="word">
                  {el &&
                    el.split("").map((lett) => {
                      return lett == " " ? (
                        <input
                          className="space"
                          onChange={(e) => setWord(e.target.value)}
                          // value={lett}
                        ></input>
                      ) : (
                        <input
                          className="letter"
                          onChange={(e) => e.target.value == lett ? (console.log("yes")) : "no"}
                          value={''}
                        ></input>
                      );
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
