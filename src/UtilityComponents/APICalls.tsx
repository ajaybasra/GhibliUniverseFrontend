import axios from "axios";
import config from "./config";

const apiPath = config.apiEndpoint;

function getAllFilms() {
  return axios.get(`${apiPath}/Film`);
}

function createReview(filmId: string, rating: number) {
  const body = {
    rating: rating,
  };

  return axios.post(`${apiPath}/Review/${filmId}`, body);
}

export { getAllFilms, createReview };
