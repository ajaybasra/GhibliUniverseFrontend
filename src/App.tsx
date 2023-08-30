import React, { useState, useEffect } from "react";
import "./App.css";
import FilmCard from "./Components/FilmCard/FilmCard";
import Header from "./Components/Header/Header";
import {
  FilmResponseDTO,
  VoiceActorResponseDTO,
} from "./UtilityComponents/Types";
import { getAllVoiceActors, getAllFilms } from "./UtilityComponents/APICalls";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import VoiceActors from "./Pages/VoiceActors";

function App() {
  const [selectedRating, setSelectedRating] = useState(0);
  const [voiceActors, setVoiceActors] = useState<VoiceActorResponseDTO[]>([]);
  const [films, setFilms] = useState<FilmResponseDTO[]>([]);

  const fetchVoiceActors = async () => {
    try {
      const response = await getAllVoiceActors();
      setVoiceActors(response.data);
    } catch (error) {
      console.error("Error fetching voice actors:", error);
    }
  };

  const fetchFilms = async () => {
    try {
      const response = await getAllFilms();
      setFilms(response.data);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  useEffect(() => {
    fetchVoiceActors();
    fetchFilms();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header
          voiceActors={voiceActors}
          films={films}
          fetchVoiceActors={fetchVoiceActors}
        />
        <Routes>
          <Route
            path="/"
            element={
              <FilmCard
                selectedRating={selectedRating}
                setSelectedRating={setSelectedRating}
              />
            }
          ></Route>
          <Route path="/VoiceActors" element={<VoiceActors />}></Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
