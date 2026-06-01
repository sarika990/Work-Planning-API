const express = require("express");
const cors = require("cors");
const app = express();
const Task = require("./models/taskmodel"); 

app.use(cors());
app.use(express.json());


app.post("/tasks", async (req, res) => {
    try {
        const newTask = new Task({
            title: req.body.title,
            description: req.body.description
        });
        
        
        const savedTask = await newTask.save(); 
        res.status(201).json({ message: "Task MongoDB mein save ho gaya!", task: savedTask });
    } catch (error) {
        res.status(500).json({ error: "Task save karne mein problem aayi" });
    }
});


app.get("/tasks", async (req, res) => {
    try {
        const { status } = req.query;
        let query = {}; 

        if (status === "completed") {
            query = { completed: true };
        } else if (status === "pending") {
            query = { completed: false };
        }

        
        const tasks = await Task.find(query);
        res.json(tasks);
    } catch (error) {
        res.status(500).json({ error: "Tasks fetch karne mein problem aayi" });
    }
});


app.put("/tasks/:id", async (req, res) => {
    try {
        
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id, 
            req.body, 
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task nahi mila" });
        }
        res.json({ message: "Task MongoDB mein update ho gaya!", task: updatedTask });
    } catch (error) {
        res.status(500).json({ error: "Update karne mein problem aayi " });
    }
});


app.delete("/tasks/:id", async (req, res) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);
        
        if (!deletedTask) {
            return res.status(404).json({ message: "Task nahi mila" });
        }
        res.json({ message: "Task hamesha ke liye Delete ho gaya!" });
    } catch (error) {
        res.status(500).json({ error: "Delete karne mein problem aayi" });
    }
});

module.exports = app;