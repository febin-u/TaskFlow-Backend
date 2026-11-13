
const Task = require("../models/Task");

// ==========================================
// 1. CREATE A NEW TASK
// ==========================================

const createTask = async (req, res) => {
    try {
        const { title, description, priority, dueDate } = req.body;

        const task = await Task.create({
            title,
            description,
            priority,
            dueDate,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            message: "Task created successfully",
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================================
// 2. GET ALL TASKS
// SEARCH + FILTER + SORT + PAGINATION
// ==========================================

const getTasks = async (req, res) => {
    try {
        const {
            status,
            priority,
            search,
            sortBy,
            order,
            page = 1,
            limit = 5
        } = req.query;

        // Only show logged-in user's tasks
        const filter = {
            user: req.user._id
        };

        if (status) {
            filter.status = status;
        }

        if (priority) {
            filter.priority = priority;
        }

        if (search) {
            filter.title = {
                $regex: search,
                $options: "i"
            };
        }

        // Sorting
        const allowedSortFields = [
            "createdAt",
            "dueDate",
            "priority",
            "title"
        ];

        const sortField = allowedSortFields.includes(sortBy)
            ? sortBy
            : "createdAt";

        const sortOrder = order === "asc" ? 1 : -1;

        // Pagination
        const currentPage = Math.max(1, parseInt(page) || 1);

        const pageLimit = Math.min(
            100,
            Math.max(1, parseInt(limit) || 5)
        );

        const skip = (currentPage - 1) * pageLimit;

        const totalTasks = await Task.countDocuments(filter);

        const tasks = await Task.find(filter)
            .sort({ [sortField]: sortOrder })
            .skip(skip)
            .limit(pageLimit);

        res.status(200).json({
            success: true,
            count: tasks.length,
            totalTasks,
            currentPage,
            totalPages: Math.ceil(totalTasks / pageLimit),
            data: tasks
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================================
// 3. GET TASK BY ID
// ==========================================

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================================
// 4. UPDATE TASK
// ==========================================

const updateTask = async (req, res) => {
    try {
        // Only allow these fields to be updated
        const allowedFields = [
            "title",
            "description",
            "status",
            "priority",
            "dueDate"
        ];

        const updates = {};

        allowedFields.forEach(field => {

            if (req.body[field] !== undefined) {
                updates[field] = req.body[field];
            }
        });
        console.log("Request Body:", req.body);
        console.log("Updates Object:", updates);

        const task = await Task.findOneAndUpdate(
            {
                _id: req.params.id,
                user: req.user._id
            },
            updates,
            {
                new: true,
                runValidators: true
            }
        );

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task updated successfully",
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================================
// 5. DELETE TASK
// ==========================================

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });

        if (!task) {
            return res.status(404).json({
                success: false,
                message: "Task not found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Task deleted successfully",
            data: task
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// ==========================================
// EXPORT ALL CONTROLLERS
// ==========================================

module.exports = {
    createTask,
    getTasks,
    getTaskById,
    updateTask,
    deleteTask
};
