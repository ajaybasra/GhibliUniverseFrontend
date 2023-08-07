import React from "react";
import "./App.css";
import Films from "./Components/Films/Films";
import Header from "./Components/Header/Header";

function App() {
  return (
    <div className="App">
      <Header></Header>
      <Films></Films>
    </div>
  );
}

export default App;
