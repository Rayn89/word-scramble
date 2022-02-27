import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState("")
  const [loading, setLoading] = useState(true)



  useEffect(() => {
    axios("https://api.hatchways.io/assessment/sentences/1")
    .then(response => {
      
      setData(response.data)
    })
    .catch(error => {console.log("error fetching data")})
    .finally(setLoading(false))
  }, [])

  if(data){
    console.log(data.data.sentence)
  }

  return (
    <div className="App">
      <h1
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        {data.data.sentence}
      </h1>
    </div>
  );
}

export default App;
