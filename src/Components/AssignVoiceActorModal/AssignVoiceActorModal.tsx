import React, { Dispatch, SetStateAction, useState } from "react";
import {
  Button,
  Modal,
  Select,
  MenuItem,
  FormControl,
  Typography,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import "./AssignVoiceActorModal.css";
import { Alert } from "@mui/material";
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
  setAssignVoiceActorNotificationOpen: Dispatch<SetStateAction<boolean>>;
}

const AssignVoiceActorModal: React.FC<AssignVoiceActorModalProps> = ({
  open,
  onClose,
  handleAssignVoiceActorSubmit,
  voiceActors,
  films,
  setAssignVoiceActorNotificationOpen,
}) => {
  const [selectedVoiceActor, setSelectedVoiceActor] =
    useState<VoiceActorResponseDTO | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<FilmResponseDTO | null>(
    null
  );

  const handleSubmit = () => {
    if (selectedVoiceActor !== null && selectedFilm !== null) {
      setValidationError(false);
      handleAssignVoiceActorSubmit(
        selectedFilm.id.toString(),
        selectedVoiceActor.id.toString()
      );
      setAssignVoiceActorNotificationOpen(true);
      onClose();
    } else {
      setValidationError(true);
    }
  };

  const [validationError, setValidationError] = useState(false);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="assign-voice-actor-modal-overlay">
        <div className="assign-voice-actor-modal-content">
          <Typography variant="h5">Assign VA To Film</Typography>
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
          {validationError && (
            <Alert severity="error" style={{ marginTop: "10px" }}>
              Please select a voice actor AND a film.
            </Alert>
          )}
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
          <button className="close-modal" onClick={onClose}>
            <FontAwesomeIcon icon={faTimesCircle} size="2x" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default AssignVoiceActorModal;
