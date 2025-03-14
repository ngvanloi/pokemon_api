# Backend Node.js API

A backend API built with Node.js and Express.js. This project provides an API for managing data, supporting features like CRUD operations, authentication, and data validation. It is designed to work in conjunction with a frontend client application.

## Setup and Running Instructions

### Prerequisites

Before getting started, ensure that you have the following software installed:

- [Node.js](https://nodejs.org/en/) (version 14.x or higher)
- [npm](https://www.npmjs.com/) (Node.js package manager)
- [MongoDB](https://www.mongodb.com/) (if using MongoDB as the database, or any other database as required)
- [Postman](https://www.postman.com/) (optional, for testing API endpoints)

### Steps to run the project locally:

1. **Clone the repository**:
   ```bash
   git https://github.com/ngvanloi/pokemon_api.git
   cd pokemon_api
   ```

2. **Install dependencies**:
   Run the following command to install the required dependencies:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   Create a `.env` file in the root directory of the project and configure the necessary environment variables, such as database connection strings, API keys, and secret keys. Example:
   ```env
   MONGO_DB="mongodb+srv://dbUser:dbUserPassword@cluster0.j3uaw.mongodb.net/"
   ACCESS_TOKEN="access_token"
   PORT=4201
   ```

4. **Start the server**:
   To start the server locally, use:
   ```bash
   npm start
   ```
   The API will be available at `http://localhost:4201/` by default.
