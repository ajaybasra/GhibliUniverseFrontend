# Ghibli Universe Frontend

A React-based frontend application designed to let users interact with the Ghibli Universe API for managing voice actors, films, and reviews associated with Studio Ghibli films.

[https://github.com/myob-fma/ajay-ghibli-frontend/assets/66146062/3365002f-e008-4573-96db-c676dea8314c
](https://github.com/ajaybasra/GhibliUniverseFrontend/assets/66146062/edc5f985-f5ab-4181-a448-82d395062520
)





## Usage

### Pre-requisites

- Node.js 14+
- React 17+
- TypeScript 4+

### Getting Started

1. Clone the repository:
`git clone [frontend repository URL]`

2. Navigate to the root directory

3. Install dependencies:
`npm install`

4. Start the application, but make sure the backend is also running locally otherwise there will be no data entries:
`npm start`

This will start the development server. Open your browser and navigate to http://localhost:3000 to access the application.

### Running Tests

To execute the test suite, use the following command: `npm test`

This command will run tests using the React Testing Library (RTL) and Jest. 

## Application Structure

- `src` contains the source code for the frontend application.
- `src/Components` includes React components used throughout the application.
- `src/Pages` contains the main pages of the application (e.g., Home, Voice Actors).
- `src/Utils` holds utility functions for API calls, data processing, etc.
- Tests that I have written are inside their respective component directories. Perhaps it may have been worth considering having a single test directory in which all the tests were housed.

## Testing Strategy

### Unit tests
Unit tests have been written for React components and utility functions using the React Testing Library (RTL) and Jest. These tests cover component rendering, user interactions, and data processing. Mocking is used when appropriate to isolate components and functions, for instance I have mocked an API call in one of my tests. Have very minimal tests at the moment as I just wanted to get experience writing frontend-tests, may be worth adding more in the future.
