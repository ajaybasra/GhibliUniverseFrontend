import axios from "axios";

const apiPath = "https://localhost:7212/Film"

function getAllFilms() {
    return axios.get(`${apiPath}`)
}

export {
    getAllFilms,
};