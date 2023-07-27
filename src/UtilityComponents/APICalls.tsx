import axios from "axios";
import config from "./config";

const apiPath = config.apiEndpoint;

function getAllFilms() {
  return axios.get(`${apiPath}/Film`);
}

export { getAllFilms };
