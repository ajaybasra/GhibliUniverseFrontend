import React, { useEffect, useState } from "react";
import {
  FilmResponseDTO,
  VoiceActorResponseDTO,
} from "../UtilityComponents/Types";
import {
  getVoiceActorsByFilm,
  getFilmsByVoiceActor,
} from "../UtilityComponents/APICalls";
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
  const [filmsByVoiceActor, setFilmsByVoiceActor] = useState<{
    [key: string]: string;
  }>({});

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

  //   const fetchFilmsByVoiceActor = async (voiceActorId: string) => {
  //     try {
  //       const response = await getFilmsByVoiceActor(voiceActorId);
  //       return response.data
  //         .map((film: FilmResponseDTO) => film.title)
  //         .join(", ");
  //     } catch (error) {
  //       console.error("Error fetching films for voice actor:", error);
  //     }
  //   };

  const fetchFilmsForVoiceActors = async () => {
    const filmsMap: { [key: string]: string } = {};

    for (const actor of voiceActors) {
      try {
        const response = await getFilmsByVoiceActor(actor.id);
        const filmTitles = response.data
          .map((film: FilmResponseDTO) => film.title)
          .join(", ");
        filmsMap[actor.id] = filmTitles;
      } catch (error) {
        console.error("Error fetching films for voice actor:", error);
        filmsMap[actor.id] = "";
      }
    }

    setFilmsByVoiceActor(filmsMap);
  };

  useEffect(() => {
    if (voiceActors.length > 0) {
      fetchFilmsForVoiceActors();
    }
  }, [voiceActors]);

  return (
    <TableContainer component={Paper}>
      <Table className="voiceactors-table" aria-label="Voice Actors Table">
        <TableHead>
          <TableRow>
            <TableCell className="voiceactors-header">Name</TableCell>
            <TableCell className="voiceactors-header">
              Films by Voice Actor
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {voiceActors.map((actor) => (
            <TableRow key={actor.id}>
              <TableCell>{actor.name}</TableCell>
              <TableCell>
                {filmsByVoiceActor[actor.id] || "Loading..."}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VoiceActors;
