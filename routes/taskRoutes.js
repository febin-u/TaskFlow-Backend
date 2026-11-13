const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");
const {
    validateTask,
    validateTaskUpdate,
    checkValidation
} = require("../validator/taskValidator");
const {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// Protected routes
router.post("/", protect, validateTask, checkValidation, createTask);
router.get("/", protect, getTasks);
router.get("/:id", protect, getTaskById);
router.put("/:id", protect, validateTaskUpdate, checkValidation, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;