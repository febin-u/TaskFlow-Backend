# TaskFlow --- Backend API

The Express and MongoDB backend for **TaskFlow**, a personal
productivity and task management application.

## Live services

-   **Backend API:** https://taskflow-backend-g7s2.onrender.com
-   **Frontend application:**
    https://taskflow-frontend-r402.onrender.com

A free Render instance may take a little time to wake after inactivity.

## Features

-   User registration and login
-   Password hashing with bcryptjs
-   JWT-based authentication
-   Protected task-management routes
-   Create, read, update, and delete tasks
-   MongoDB persistence with Mongoose
-   Request validation and middleware
-   Health-check/root endpoint

## Technology stack

Node.js, Express, MongoDB, Mongoose, JSON Web Token (JWT), bcryptjs,
express-validator, and dotenv.

## Project structure

-   `config/` --- database configuration
-   `controllers/` --- request handlers
-   `middleware/` --- authentication and middleware
-   `models/` --- database models
-   `routes/` --- API routes
-   `validator/` --- request validation

## Run locally

``` bash
git clone https://github.com/febin-u/TaskFlow-Backend.git
cd TaskFlow-Backend
npm install
```

Create a `.env` file in the project root:

``` env
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_long_random_secret
```

Start the server:

``` bash
npm start
```

For development with automatic restarts:

``` bash
npm run dev
```

## API endpoints

### Authentication

  Method   Endpoint               Description
  -------- ---------------------- ---------------------
  POST     `/api/auth/register`   Register a new user
  POST     `/api/auth/login`      Log in

### Tasks

  Method   Endpoint           Description
  -------- ------------------ ------------------------------------
  GET      `/api/tasks`       Get the authenticated user's tasks
  POST     `/api/tasks`       Create a task
  GET      `/api/tasks/:id`   Get a task by ID
  PUT      `/api/tasks/:id`   Update a task
  DELETE   `/api/tasks/:id`   Delete a task

Task routes require a JWT in the request header:

``` http
Authorization: Bearer YOUR_TOKEN
```

## Related repository

[TaskFlow Frontend](https://github.com/febin-u/TaskFlow-Frontend)

## Security

Never commit `.env` files or share MongoDB credentials, JWT secrets, or
access tokens. Configure private environment variables in your
deployment dashboard.

## Developer

**Febin U**
