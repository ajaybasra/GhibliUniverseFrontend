export interface FilmResponseDTO {
  id: string;
  title: string;
  description: string;
  director: string;
  composer: string;
  releaseYear: string;
  filmReviewInfo: {
    averageRating: number;
    numberOfRatings: number;
  };
}

export interface VoiceActorResponseDTO {
  id: string;
  name: string;
}
