import React from "react";
import "./AddVoiceActor.css";
import Button from "@mui/material/Button";

type OnClickHandler = () => void;

interface AddVoiceActorProps {
  onClick: OnClickHandler;
}

function AddVoiceActor({ onClick }: AddVoiceActorProps) {
  return (
    <Button
      variant="outlined"
      className="add-voice-actor-button"
      onClick={onClick}
    >
      Add VA
    </Button>
  );
}

export default AddVoiceActor;
