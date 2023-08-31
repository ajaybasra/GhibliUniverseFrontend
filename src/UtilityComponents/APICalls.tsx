import axios from "axios";
import config from "./config";

const apiPath = config.apiEndpoint;

function getAllFilms() {
  return axios.get(`${apiPath}/Film`);
}

function getFilmsByVoiceActor(voiceActorId: string) {
  return axios.get(`${apiPath}/VoiceActor/${voiceActorId}/films`);
}

function getAllVoiceActors() {
  return axios.get(`${apiPath}/VoiceActor`);
}

function getVoiceActorsByFilm(filmId: string) {
  return axios.get(`${apiPath}/Film/${filmId}/voiceActors`);
}

function createReview(filmId: string, rating: number) {
  const body = {
    rating: rating,
  };

  return axios.post(`${apiPath}/Review/${filmId}`, body);
}

function createVoiceActor(name: string) {
  const body = {
    name: name,
  };

  return axios.post(`${apiPath}/VoiceActor`, body);
}

function linkVoiceActor(filmId: string, voiceActorId: string) {
  return axios.post(`${apiPath}/Film/${filmId}/LinkVoiceActor`, voiceActorId, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export {
  getAllFilms,
  createReview,
  createVoiceActor,
  linkVoiceActor,
  getAllVoiceActors,
  getVoiceActorsByFilm,
  getFilmsByVoiceActor,
};
