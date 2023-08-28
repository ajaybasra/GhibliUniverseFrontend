import React, { useState } from "react";
import {
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Autocomplete,
  Typography,
} from "@mui/material";
import "./AssignVoiceActorModal.css";
import {
  FilmResponseDTO,
  VoiceActorResponseDTO,
} from "../../UtilityComponents/Types";

interface AssignVoiceActorModalProps {
  open: boolean;
  onClose: () => void;
  handleAssignVoiceActorSubmit: (
    filmId: string,
    voiceActorId: string
  ) => Promise<void>;
  voiceActors: VoiceActorResponseDTO[];
  films: FilmResponseDTO[];
}

const AssignVoiceActorModal: React.FC<AssignVoiceActorModalProps> = ({
  open,
  onClose,
  handleAssignVoiceActorSubmit,
  voiceActors,
  films,
}) => {
  const [selectedVoiceActor, setSelectedVoiceActor] =
    useState<VoiceActorResponseDTO | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<FilmResponseDTO | null>(
    null
  );

  const handleSubmit = () => {
    if (selectedVoiceActor !== null && selectedFilm !== null) {
      handleAssignVoiceActorSubmit(
        selectedFilm.id.toString(),
        selectedVoiceActor.id.toString()
      );
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-content">
          <FormControl fullWidth>
            <Select
              labelId="voice-actor-select-label"
              value={selectedVoiceActor ? selectedVoiceActor.id : 0}
              onChange={(e) => {
                const selectedActorId = e.target.value as string;
                const actor = voiceActors.find(
                  (actor) => actor.id === selectedActorId
                );
                setSelectedVoiceActor(actor || null);
              }}
            >
              <MenuItem value={0}>Select a voice actor</MenuItem>
              {voiceActors.map((actor) => (
                <MenuItem key={actor.id} value={actor.id}>
                  {actor.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <Select
              labelId="film-select-label"
              value={selectedFilm ? selectedFilm.id : 0}
              onChange={(e) => {
                const selectedFilmId = e.target.value as string;
                const film = films.find((film) => film.id === selectedFilmId);
                setSelectedFilm(film || null);
              }}
            >
              <MenuItem value={0}>Select a film</MenuItem>
              {films.map((film) => (
                <MenuItem key={film.id} value={film.id}>
                  {film.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignVoiceActorModal;
