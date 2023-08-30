import React, { useEffect, useState } from "react";
import { VoiceActorResponseDTO } from "../UtilityComponents/Types";
import { getVoiceActorsByFilm } from "../UtilityComponents/APICalls";
import { useLocation } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import "./VoiceActors.css";

const VoiceActors = () => {
  const { state } = useLocation();
  const [voiceActors, setVoiceActors] = useState<VoiceActorResponseDTO[]>([]);

  const fetchVoiceActorsByFilm = async () => {
    try {
      const response = await getVoiceActorsByFilm(state.filmId);
      setVoiceActors(response.data);
    } catch (error) {
      console.error("Error fetching voice actors for film:", error);
    }
  };

  useEffect(() => {
    fetchVoiceActorsByFilm();
  }, []);

  return (
    <TableContainer component={Paper}>
      <Table className="voiceactors-table" aria-label="Voice Actors Table">
        <TableHead>
          <TableRow>
            <TableCell className="voiceactors-header">Name</TableCell>
            <TableCell className="voiceactors-header">Films</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {voiceActors.map((actor) => (
            <TableRow key={actor.id}>
              <TableCell>{actor.name}</TableCell>
              <TableCell>{state.filmTitle}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VoiceActors;
