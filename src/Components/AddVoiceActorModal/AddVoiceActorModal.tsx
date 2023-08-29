import React, { useState } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";
import { Alert } from "@mui/material";
import "./AddVoiceActorModal.css";

interface AddVoiceActorModalProps {
  open: boolean;
  onClose: () => void;
  handleAddVoiceActorSubmit: (name: string) => Promise<void>;
  voiceActorName: string;
  setVoiceActorName: React.Dispatch<React.SetStateAction<string>>;
}

const AddVoiceActorModal: React.FC<AddVoiceActorModalProps> = ({
  open,
  onClose,
  handleAddVoiceActorSubmit,
  voiceActorName,
  setVoiceActorName,
}) => {
  const handleSubmit = () => {
    if (voiceActorName.trim() !== "") {
      setValidationError(false);
      handleAddVoiceActorSubmit(voiceActorName);
      onClose();
    } else {
      setValidationError(true);
    }
  };

  const [validationError, setValidationError] = useState(false);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="add-voice-actor-modal-overlay">
        <div className="add-voice-actor-modal-content">
          <Typography variant="h5">Add VA</Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={voiceActorName}
            onChange={(e) => setVoiceActorName(e.target.value)}
            fullWidth
          />
          {validationError && (
            <Alert severity="error" style={{ marginTop: "10px" }}>
              Please enter a valid name.
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

export default AddVoiceActorModal;
