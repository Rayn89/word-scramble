import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import scrambler from "./scrambler";

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  let newNum = useRef(1);
  const score = useRef(0);
  const [checkLen, setCheckLen] = useState(null)
  const [showButt, setShowButt ] = useState(false)

  let inputArray;
  setTimeout(() => {
    inputArray = document.querySelectorAll("input");
    inputArray[0].focus();
    inputArray[0].disabled = false;
    setCheckLen(inputArray.length)
  }, 1000);

  //Counter passed into fetch API.
  let number = 0;

  const handleEnter = (event) => {
      const form = event.target.form;
      const index = [...form].indexOf(event.target);
      form.elements[index].className = "correct"
      const nextOne = form.elements[index + 1]
      if(nextOne){
        nextOne.disabled = false;
        nextOne.focus()
      }else{
        let showbutt = document.querySelector('button');
        showbutt.className = "show-button"
      }
      event.preventDefault();
    }

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
        <form className="guess-container">
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
                          disabled={true}
                          onChange={(e) =>
                            e.target.value == lett ? handleEnter(e) : "no"
                          }
                        ></input>
                      ) : (
                        <input
                          name={+(counter += 1)}
                          className="letter"
                          maxLength="1"
                          disabled={true}
                          onChange={(e) =>
                            e.target.value == lett ? handleEnter(e) : "no"
                          }
                        ></input>
                      );
                    })}
                </div>
              );
            })}
        </form>
        <button className="hidden-button">Next</button>
      </div>
    </div>
  );
}

export default App;
