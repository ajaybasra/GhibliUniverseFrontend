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

interface HeaderProps {
  voiceActors: VoiceActorResponseDTO[];
  films: FilmResponseDTO[];
}

function Header({ voiceActors, films }: HeaderProps) {
  const [voiceActorName, setVoiceActorName] = useState("");
  const [addVoiceActorOpen, setAddVoiceActorOpen] = useState(false);
  const [assignVoiceActorOpen, setAssignVoiceActorOpen] = useState(false);

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
      // setNotificationOpen(true);
      // await fetchFilms(); // hmm
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
      // setNotificationOpen(true);
      // await fetchFilms(); // hmm
    } catch (error) {
      console.error("Error assigning voice actor:", error);
    }
  };

  return (
    <header className="header">
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
          <img src={Logo} height={65} alt="Logo" />
        </div>
        <h2 className="header--title">Ghibli Universe</h2>
      </div>
      <div className="header--buttons">
        <AddVoiceActor onClick={handleAddVoiceActorOpen} />
        <AssignVoiceActor onClick={handleAssignVoiceActorOpen} />
      </div>
    </header>
  );
}

export default Header;
