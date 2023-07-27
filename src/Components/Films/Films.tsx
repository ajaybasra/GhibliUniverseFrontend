import React, { useEffect, useState } from "react";
import { FilmResponseDTO } from "../../UtilityComponents/Types";
import { getAllFilms } from "../../UtilityComponents/APICalls";

function Films() {
  const [films, setFilms] = useState<FilmResponseDTO[]>([]);

  const fetchFilms = async () => {
    try {
      const response = await getAllFilms();
      setFilms(response.data);
    } catch (error) {
      console.error("Error fetching films:", error);
    }
  };

  useEffect(() => {
    fetchFilms();
  }, []);

  return (
    <div>
      <h1>List of Films</h1>
      <ul>
        {films.map((film) => (
          <li key={film.id}>
            <strong>{film.title}</strong> - {film.director}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Films;
