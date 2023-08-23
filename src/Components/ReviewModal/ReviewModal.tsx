import React, { useState } from "react";
import {
  Button,
  Modal,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import "./ReviewModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Alert } from "@mui/material";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  filmId: string;
  handleReviewSubmit: (filmId: string) => Promise<void>;
  selectedRating: number;
  setSelectedRating: React.Dispatch<React.SetStateAction<number>>;
}

const CustomModal: React.FC<ModalProps> = ({
  open,
  onClose,
  filmId,
  handleReviewSubmit,
  selectedRating,
  setSelectedRating,
}) => {
  const handleSubmit = () => {
    if (selectedRating !== 0) {
      setValidationError(false);
      handleReviewSubmit(filmId);
      onClose();
    } else {
      setValidationError(true);
    }
  };

  const [validationError, setValidationError] = useState(false);

  return (
    <Modal open={open} onClose={onClose}>
      <div className="modal-overlay">
        <div className="modal-content">
          <Typography variant="h5">Select a Rating</Typography>
          <FormControl>
            <InputLabel id="rating-select-label"></InputLabel>
            <Select
              labelId="rating-select-label"
              value={selectedRating}
              onChange={(e) => {
                setSelectedRating(Number(e.target.value));
                setValidationError(false);
              }}
            >
              <MenuItem value={0}>Select a rating</MenuItem>
              {Array.from({ length: 10 }, (_, i) => i + 1).map((number) => (
                <MenuItem key={number} value={number}>
                  {number}
                </MenuItem>
              ))}
            </Select>
            {validationError && (
              <Alert severity="error" style={{ marginTop: "10px" }}>
                Please select a rating before submitting.
              </Alert>
            )}
          </FormControl>
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

export default CustomModal;
