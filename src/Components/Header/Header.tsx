import React, { useState } from "react";
import "./Header.css";
import Logo from "../../images/header-logo.png";
import AddVoiceActor from "../AddVoiceActor/AddVoiceActor";
import AssignVoiceActor from "../AssignVoiceActor/AssignVoiceActor";
import AddVoiceActorModal from "../AddVoiceActorModal/AddVoiceActorModal";
import {
  createVoiceActor,
  linkVoiceActor,
} from "../../UtilityComponents/APICalls";
import {
  FilmResponseDTO,
  VoiceActorResponseDTO,
} from "../../UtilityComponents/Types";
import AssignVoiceActorModal from "../AssignVoiceActorModal/AssignVoiceActorModal";
import { Snackbar, Alert } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {
  voiceActors: VoiceActorResponseDTO[];
  films: FilmResponseDTO[];
  fetchVoiceActors: () => Promise<void>;
}

function Header({ voiceActors, films, fetchVoiceActors }: HeaderProps) {
  const [voiceActorName, setVoiceActorName] = useState("");
  const [addVoiceActorOpen, setAddVoiceActorOpen] = useState(false);
  const [assignVoiceActorOpen, setAssignVoiceActorOpen] = useState(false);
  const [addVoiceActorNotificationOpen, setAddVoiceActorNotificationOpen] =
    useState(false);
  const [
    assignVoiceActorNotificationOpen,
    setAssignVoiceActorNotificationOpen,
  ] = useState(false);

  const handleAddVoiceActorOpen = () => {
    setAddVoiceActorOpen(true);
  };

  const handleAddVoiceActorClose = () => {
    setAddVoiceActorOpen(false);
  };

  const handleAddVoiceActorSubmit = async () => {
    try {
      const response = await createVoiceActor(voiceActorName);
      console.log("Voice actor created:", response.data);
      setAddVoiceActorNotificationOpen(true);
      await fetchVoiceActors(); // hmm
    } catch (error) {
      console.error("Error creating voice actor:", error);
    }
  };

  const handleAssignVoiceActorOpen = () => {
    setAssignVoiceActorOpen(true);
  };

  const handleAssignVoiceActorClose = () => {
    setAssignVoiceActorOpen(false);
  };

  const handleAssignVoiceActorSubmit = async (
    filmId: string,
    voiceActorId: string
  ) => {
    try {
      const response = await linkVoiceActor(filmId, voiceActorId);
      console.log("Voice actor now assigned:", response.data);
      setAssignVoiceActorNotificationOpen(true);
      // await fetchFilms(); // hmm
    } catch (error) {
      console.error("Error assigning voice actor:", error);
    }
  };

  return (
    <header className="header">
      <Snackbar
        open={addVoiceActorNotificationOpen}
        autoHideDuration={4000}
        onClose={() => setAddVoiceActorNotificationOpen(false)}
      >
        <Alert
          onClose={() => setAddVoiceActorNotificationOpen(false)}
          severity="success"
        >
          Voice actor added successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={assignVoiceActorNotificationOpen}
        autoHideDuration={4000}
        onClose={() => setAssignVoiceActorNotificationOpen(false)}
      >
        <Alert
          onClose={() => setAssignVoiceActorNotificationOpen(false)}
          severity="success"
        >
          Voice actor assigned successfully!
        </Alert>
      </Snackbar>
      <AddVoiceActorModal
        open={addVoiceActorOpen}
        onClose={handleAddVoiceActorClose}
        handleAddVoiceActorSubmit={handleAddVoiceActorSubmit}
        voiceActorName={voiceActorName}
        setVoiceActorName={setVoiceActorName}
      />
      <AssignVoiceActorModal
        open={assignVoiceActorOpen}
        onClose={handleAssignVoiceActorClose}
        handleAssignVoiceActorSubmit={handleAssignVoiceActorSubmit}
        voiceActors={voiceActors}
        films={films}
      />
      <div className="header--div">
        <div className="logo">
          <Link to="/">
            <img src={Logo} height={65} alt="Logo" />
          </Link>
        </div>
        <h2 className="header--title">
          <Link className="header--title" to="/">
            Ghibli Universe
          </Link>
        </h2>
      </div>
      <div className="header--buttons">
        <AddVoiceActor onClick={handleAddVoiceActorOpen} />
        <AssignVoiceActor onClick={handleAssignVoiceActorOpen} />
      </div>
    </header>
  );
}

export default Header;
