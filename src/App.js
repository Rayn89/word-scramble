import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import scrambler from "./scrambler";
import {rowCount, columnCount} from "./sentenceParser"

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  let newNum = useRef(1);
  const score = useRef(0);
  const savedWord = useRef();
  const inputRef = useRef(null);
  const [inputs, setInputs] = useState("");

  let inputArray;
  setTimeout(() => {
    inputArray = document.querySelectorAll("input");
    inputArray[0].focus();
  }, 1000);

  //Counter passed into fetch API.
  let number = 0;

  //Fetching data and assigning to setData useState.
  useEffect(() => {
    axios(`https://api.hatchways.io/assessment/sentences/${newNum.current}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("error fetching data");
      })
      .finally(setLoading(false));
  }, []);

  //Splitting the string received from fetch, keeping the space.
  let newWord;
  if (data) {
    newWord = data.sentence.split(/(\S+\s+)/).filter(function (n) {
      return n;
    });
  }
  let counter = 0;

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
        <div>Score: {score.current}</div>
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
                          name={(counter += 1)}
                          maxLength="1"
                          onChange={(e) =>
                            e.target.value == lett ? console.log("YES") : "no"
                          }
                        ></input>
                      ) : (
                        <input
                          name={(counter += 1)}
                          className="letter"
                          maxLength="1"
                          onChange={(e) =>
                            e.target.value == lett ? console.log("YES") : "no"
                          }
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
