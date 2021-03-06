import { useState, useEffect, useRef } from "react";
import "./App.css";
import axios from "axios";
import scrambler from "./scrambler";
import resetFields from "./resetter"

function App() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const [checkLen, setCheckLen] = useState(null);

  //Number to update the fetch API.
  const [apiNum, setApiNum] = useState(1);

  //Score total.
  let score = useRef(0);
  
  //Function to set focus on first input after a timeout.
  let inputArray;
  let timeoutSet = () => {
  setTimeout(() => {
    inputArray = document.querySelectorAll("input");
    inputArray[0].focus();
    inputArray[0].disabled = false;
    setCheckLen(inputArray.length)
  }, 1000);}
  timeoutSet()

  //Function to set focus on next input.
  const handleEnter = (event) => {
    const form = event.target.form;
    const index = [...form].indexOf(event.target);
    form.elements[index].className = "correct"
    const nextOne = form.elements[index + 1]
    if (form.elements[index + 2]) {
      nextOne.disabled = false;
      nextOne.focus();
    } else {
      let showbutt = document.querySelector("button");
      showbutt.className = "show-button";
    }
    event.preventDefault();
  }
    
  //Function to fetch data and assign to data state variable.
  const fetchInfo = () => {
    axios(`https://api.hatchways.io/assessment/sentences/${apiNum}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.log("error fetching data");
      })
      .finally(setLoading(false));
  }

  //Clear form on submit.
  const clearForm = () => {
    document.getElementById('guess-form').reset()
  }

  //Fetching data.
  useEffect(() => {
    fetchInfo()
    timeoutSet()
  }, []);


  //Submit to reset classes, fetch new info, clear inputs, add to score.
  const handleSubmit = async (e) => {
    e.preventDefault();
    resetFields();
    fetchInfo();
    clearForm()
    timeoutSet()
    score.current++
  }

  //Splitting the string received from fetch, keeping the space.
  let newWord;
  if (data) {
    newWord = data.sentence.split(/(\S+\s+)/).filter(function (n) {
      console.log(data.sentence);
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
        <div className="score">Score: {score.current}</div>
        <form
          className="guess-container"
          id="guess-form"
          onSubmit={handleSubmit}
        >
          {data &&
            newWord.map((el) => {
              return (
                <div className="word">
                  {el &&
                    el.split("").map((lett) => {
                      return lett == " " ? (
                        <input
                          className="space"
                          name="space"
                          maxLength="1"
                          disabled={true}
                          onChange={(e) =>
                            e.target.value == lett ? handleEnter(e) : "no"
                          }
                        ></input>
                      ) : (
                        <input
                          name="letter"
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
          <button
            className="hidden-button"
            type="submit"
            onClick={(e) => setApiNum(apiNum + 1)}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}

export default App;
