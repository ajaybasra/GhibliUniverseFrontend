import React from "react";
import "./AssignVoiceActor.css";
import Button from "@mui/material/Button";

type OnClickHandler = () => void;

interface AssignVoiceActorProps {
  onClick: OnClickHandler;
}

function AssignVoiceActor({ onClick }: AssignVoiceActorProps) {
  return (
    <Button
      variant="outlined"
      className="assign-voice-actor-button"
      onClick={onClick}
    >
      Assign VA
    </Button>
  );
}

export default AssignVoiceActor;
