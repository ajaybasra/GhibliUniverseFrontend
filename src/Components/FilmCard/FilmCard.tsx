import React, { useEffect, useState } from "react";
import "./FilmCard.css";
import ReviewLogo from "../../images/add-review-logo.png";
import ReviewModal from "../ReviewModal/ReviewModal";
import { FilmResponseDTO } from "../../UtilityComponents/Types";
import { getAllFilms, createReview } from "../../UtilityComponents/APICalls";
import { Snackbar, Alert } from "@mui/material";

interface FilmCardProps {
  selectedRating: number;
  setSelectedRating: React.Dispatch<React.SetStateAction<number>>;
}

const FilmCard: React.FC<FilmCardProps> = ({
  selectedRating,
  setSelectedRating,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = (filmId: string) => {
    setFilmIdToRate(filmId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [films, setFilms] = useState<FilmResponseDTO[]>([]);

  const [filmIdToRate, setFilmIdToRate] = useState("");

  const [notificationOpen, setNotificationOpen] = useState(false);

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

  const handleReviewSubmit = async (filmId: string) => {
    try {
      const response = await createReview(filmId, selectedRating);
      console.log("Review created:", response.data);
      setNotificationOpen(true);
      await fetchFilms(); // hmm
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div className="filmcard--films">
      <ReviewModal
        open={open}
        onClose={handleClose}
        filmId={filmIdToRate}
        handleReviewSubmit={handleReviewSubmit}
        selectedRating={selectedRating}
        setSelectedRating={setSelectedRating}
      />
      <Snackbar
        open={notificationOpen}
        autoHideDuration={4000}
        onClose={() => setNotificationOpen(false)}
      >
        <Alert onClose={() => setNotificationOpen(false)} severity="success">
          Review added successfully!
        </Alert>
      </Snackbar>
      {films.map((film) => (
        <div className="filmcard--card">
          <div
            className="filmcard--add-review"
            onClick={() => handleOpen(film.id)}
          >
            <img src={ReviewLogo} alt="Add Review Icon" />
          </div>

          <div className="filmcard--poster">
            <img
              src="https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=986&q=80"
              alt=""
            />
          </div>

          <div className="filmcard--fields">
            <p className="filmcard--title">
              <strong>{film.title}</strong>
            </p>
            <p className="filmcard--vote">{film.releaseYear}</p>
          </div>

          <div className="filmcard--overview">
            <h2 className="filmcard--overview-title">Overview:</h2>
            <h3 className="filmcard--overview-info">
              Director: {film.director}
            </h3>
            <h3 className="filmcard--overview-info">
              Composer: {film.composer}
            </h3>
            <h3 className="filmcard--overview-info">
              Synopsis: {film.description}
            </h3>
            <h3 className="filmcard--overview-info">
              {film.filmReviewInfo.numberOfRatings > 0
                ? `Average Rating: ${(
                    Math.round(film.filmReviewInfo.averageRating * 100) / 100
                  ).toFixed(2)} (${film.filmReviewInfo.numberOfRatings})`
                : "This film has no reviews."}
            </h3>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FilmCard;
