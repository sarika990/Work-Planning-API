const express = require("express");
const cors = require("cors");
const app = express();

// Case-Sensitivity safe loading (works on both Windows and Render Linux)
let Task;
try {
    Task = require("./models/taskmodel");
} catch (err) {
    try {
        Task = require("./models/taskModel");
    } catch (err2) {
        console.error("Could not load Task model with either case variant:", err2);
    }
}

app.use(cors());
app.use(express.json());

// 1. GET - Fetch all tasks
app.get("/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. POST - Create a new task with title, description, dueDate, and status
app.post("/tasks", async (req, res) => {
    try {
        const { title, description, dueDate, status } = req.body;

        if (!title) {
            return res.status(400).json({ error: "Title is required!" });
        }

        const newTask = new Task({
            title,
            description,
            dueDate: dueDate || "",
            status: status || "pending"
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 3. PUT - Update the 3-state status of a task
app.put("/tasks/:id", async (req, res) => {
    try {
        const { status } = req.body;

        // Validate against the allowed enum values
        const validStatuses = ["complete", "pending", "notcomplete"];
        const safeStatus = validStatuses.includes(status) ? status : "pending";

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { status: safeStatus },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found!" });
        }
        res.json(updatedTask);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. DELETE - Remove a task
app.delete("/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found!" });
        }
        res.json({ message: "Task successfully deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = app;