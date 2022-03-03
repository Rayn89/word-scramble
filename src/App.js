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

  //Counter passed into fetch API.
  let number = 1;

   const setFocus = () => {
     //Add id to the table
     let first = document.getElementsByTagName("input")[0];

     //table > tbody > tr (latest added row) > td (first cell in the row) > input
     //  let cell =
     //    document.getElementById("mytable").lastElementChild.lastElementChild
     //      .firstElementChild.children[0];
     console.log(first);
     if (first) {
       first.focus();
     }
   };
   setFocus()

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
                          key={(counter += 1)}
                          maxLength="1"
                          onChange={(e) =>
                            e.target.value == lett ? console.log("YES") : "no"
                          }
                        ></input>
                      ) : (
                        <input
                          key={(counter += 1)}
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
