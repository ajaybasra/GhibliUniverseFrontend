import React, { useState } from "react";
import { Button, Modal, TextField, Typography } from "@mui/material";
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
      handleAddVoiceActorSubmit(voiceActorName);
      onClose();
    }
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-content">
          <Typography variant="h5">Add Voice Actor</Typography>
          <TextField
            label="Name"
            variant="outlined"
            value={voiceActorName}
            onChange={(e) => setVoiceActorName(e.target.value)}
            fullWidth
          />
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default AddVoiceActorModal;
