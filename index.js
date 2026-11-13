const taskRoutes = require("./routes/taskRoutes");
const authRoutes = require("./routes/authRoutes");
const connectDB = require("./config/db");
const express = require("express");
const cors = require("cors");
const errorHandler = require("./middleware/errorMiddleware");

require("dotenv").config();

const app = express();


// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Home route
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Task Manager API is running!"
    });
});

// Health check
app.get("/api/health", (req, res) => {
    res.status(200).json({
        status: "OK",
        message: "Server is healthy"
    });
});
// Error Handling Middleware

// Handle unknown routes
app.use((req, res, next) => {
    const error = new Error(`Route not found: ${req.originalUrl}`);
    error.statusCode = 404;
    next(error);
});

app.use(errorHandler);
// Server
const PORT = process.env.PORT || 5001;

const startServer = async () => {
    await connectDB();

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
};

startServer();