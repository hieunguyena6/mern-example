import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [scores, setScores] = useState([]);
  useEffect(() => {
    const fetchScores = async () => {
      const res = await fetch("https://mern-be-example.herokuapp.com/scores");
      const bodyJson = await res.json();
      setScores(bodyJson);
    };
    fetchScores();
  }, []);
  return (
    <div className="App">
      {scores.map((score) => (
        <p key={score._id}>score: {score.value}</p>
      ))}
    </div>
  );
}

export default App;
