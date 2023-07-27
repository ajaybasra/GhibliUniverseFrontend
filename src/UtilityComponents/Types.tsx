export interface FilmResponseDTO {
  id: string;
  title: string;
  description: string;
  director: string;
  composer: string;
  releaseYear: string;
}

export interface ReviewRespponseDTO {
  id: string;
  rating: Number;
}

export interface VoiceActionResponseDTO {
  id: string;
  name: string;
}
