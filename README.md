# TaskFlow – Backend

Backend API for the TaskFlow task management application.

## Technologies
- Node.js
- Express.js
- MongoDB
- Mongoose
- JavaScript

## Project Structure
- config/
- controllers/
- middleware/
- models/
- routes/
- validator/

## Features
- REST API architecture
- Database integration
- Request handling and middleware
- Task management functionality

## Setup
1. Clone the repository.
2. Run `npm install`.
3. Configure your environment variables in `.env`.
4. Run the application using `npm start` or the script defined in package.json.

## Environment Variables

Create a `.env` file in the backend root directory:

PORT=5001

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_secret_key

## Installation

1. Clone the repository:

   git clone https://github.com/febin-u/TaskFlow-Backend.git

2. Navigate into the project:

   cd TaskFlow-Backend

3. Install dependencies:

   npm install

4. Configure your .env file.

5. Start the server:

   npm start

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register a new user |
| POST | `/api/auth/login` | Login user |

### Task Management

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/:id` | Get a task by ID |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |

### Authentication

Protected task endpoints require a JWT token.

Include the token in the request header:

`Authorization: Bearer YOUR_TOKEN`


## Developer
Febin U
