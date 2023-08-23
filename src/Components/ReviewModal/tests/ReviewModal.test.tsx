import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ReviewModal from "../ReviewModal";

describe("ReviewModal Component", () => {
  it("displays the modal correctly", () => {
    const handleClose = jest.fn();
    const handleReviewSubmit = jest.fn();

    render(
      <ReviewModal
        open={true}
        onClose={handleClose}
        filmId="1"
        handleReviewSubmit={handleReviewSubmit}
        selectedRating={0}
        setSelectedRating={() => {}}
      />
    );

    // Check if the modal is displayed
    expect(screen.getByText("Select a Rating")).toBeInTheDocument();
  });

  it("displays validation error for no rating selected", () => {
    const handleClose = jest.fn();
    const handleReviewSubmit = jest.fn();

    render(
      <ReviewModal
        open={true}
        onClose={handleClose}
        filmId="1"
        handleReviewSubmit={handleReviewSubmit}
        selectedRating={0}
        setSelectedRating={() => {}}
      />
    );

    // Click the Submit button without selecting a rating
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Check if the validation error is displayed
    expect(
      screen.getByText("Please select a rating before submitting.")
    ).toBeInTheDocument();
  });

  it("submits a review and closes the modal", () => {
    const handleClose = jest.fn();
    const handleReviewSubmit = jest.fn();

    render(
      <ReviewModal
        open={true}
        onClose={handleClose}
        filmId="1"
        handleReviewSubmit={handleReviewSubmit}
        selectedRating={5}
        setSelectedRating={() => {}}
      />
    );

    // Click the Submit button with a selected rating
    const submitButton = screen.getByText("Submit");
    fireEvent.click(submitButton);

    // Check if the handleReviewSubmit function is called
    expect(handleReviewSubmit).toHaveBeenCalledWith("1");

    // Check if the modal is closed
    expect(handleClose).toHaveBeenCalled();
  });
});
