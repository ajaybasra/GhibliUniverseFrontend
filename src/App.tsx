import React, { useState } from "react";
import "./App.css";
import FilmCard from "./Components/FilmCard/FilmCard";
import Header from "./Components/Header/Header";

function App() {
  const [selectedRating, setSelectedRating] = useState(0);

  return (
    <div className="App">
      <Header />
      <FilmCard
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
    </div>
  );
}

export default App;
