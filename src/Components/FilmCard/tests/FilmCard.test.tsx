import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import FilmCard from "../FilmCard";
import axios from "axios";

jest.mock("axios");

describe("FilmCard Component", () => {
  beforeEach(() => {
    (axios.get as jest.Mock).mockResolvedValue({
      data: [
        {
          id: "1",
          title: "Film 1",
          description: "Description 1",
          director: "Director 1",
          composer: "Composer 1",
          releaseYear: "2022",
          filmReviewInfo: {
            averageRating: 9.5,
            numberOfRatings: 10,
          },
        },
        {
          id: "2",
          title: "Film 2",
          description: "Description 2",
          director: "Director 2",
          composer: "Composer 2",
          releaseYear: "2021",
          filmReviewInfo: {
            averageRating: 0,
            numberOfRatings: 0,
          },
        },
      ],
    });
  });

  it("displays film details when hovered", async () => {
    render(<FilmCard selectedRating={4} setSelectedRating={jest.fn()} />);

    // Wait for the component to render
    await screen.findByText("Film 1");

    // Get the first card
    const card = screen.getByText("Film 1");

    // Simulate hovering over the card
    fireEvent.mouseEnter(card);

    expect(screen.getByText("Director: Director 1")).toBeInTheDocument();
    expect(screen.getByText("Composer: Composer 1")).toBeInTheDocument();
    expect(screen.getByText("Synopsis: Description 1")).toBeInTheDocument();
    expect(screen.getByText("Average Rating: 9.50 (10)")).toBeInTheDocument();
  });

  it("displays this film has no reviews when a film has no reviews", async () => {
    render(<FilmCard selectedRating={4} setSelectedRating={jest.fn()} />);

    // Wait for the component to render
    await screen.findByText("Film 2");

    // Get the first card
    const card = screen.getByText("Film 2");

    // Simulate hovering over the card
    fireEvent.mouseEnter(card);

    expect(screen.getByText("This film has no reviews.")).toBeInTheDocument();
  });
});
