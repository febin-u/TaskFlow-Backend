
const { body, validationResult } = require("express-validator");

// Task validation rules
const validateTask = [
    body("title")
        .trim()
        .notEmpty()
        .withMessage("Task title is required"),

    body("description")
        .optional()
        .trim(),

    body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Invalid priority"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid due date"),

    body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Invalid status")
];
// Validation rules for updating tasks
const validateTaskUpdate = [
    body("title")
        .optional()
        .trim()
        .notEmpty()
        .withMessage("Task title cannot be empty"),

    body("description")
        .optional()
        .trim(),

    body("status")
        .optional()
        .isIn(["pending", "completed"])
        .withMessage("Invalid status"),

    body("priority")
        .optional()
        .isIn(["low", "medium", "high"])
        .withMessage("Invalid priority"),

    body("dueDate")
        .optional()
        .isISO8601()
        .withMessage("Invalid due date")
];

// Check validation errors
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
    validateTask,
    validateTaskUpdate,
    checkValidation
};
