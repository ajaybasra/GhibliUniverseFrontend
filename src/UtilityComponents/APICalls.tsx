import axios from "axios";
import config from "./config";

const apiPath = config.apiEndpoint;

function getAllFilms() {
  return axios.get(`${apiPath}/Film`);
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
  const body = { voiceActorId };
  return axios.post(`${apiPath}/Film/${filmId}/LinkVoiceActor`, voiceActorId, {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
// function linkVoiceActor(filmId: string, voiceActorId: string) {
//   const body = { voiceActorId };
//   return axios.post(`${apiPath}/Film/${filmId}/LinkVoiceActor`, body);
// }
// function linkVoiceActor(filmId: string, voiceActorId: string) {
//   const body = { voiceActorId }; // Just the raw value, not an object
//   const config = {
//     headers: {
//       "Content-Type": "text/plain; charset=utf-8",
//     },
//   };

//   return axios.post(`${apiPath}/Film/${filmId}/LinkVoiceActor`, body, config);
// }

export {
  getAllFilms,
  createReview,
  createVoiceActor,
  linkVoiceActor,
  getAllVoiceActors,
  getVoiceActorsByFilm,
};
