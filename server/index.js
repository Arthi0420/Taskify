const express = require("express");
const cors = require("cors");
const mongoose = require('mongoose');
const bodyParser = require("body-parser");
require('dotenv').config();

const app = express();

app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: 'GET, PUT, POST, DELETE',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
}));

app.use(bodyParser.json())
app.use(express.json());


// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL )
    .then(() => {
        console.log("DB Connected Successfully");
    })
    .catch((error) => {
        console.error("DB Connection Failed", error);
    });

// Create Schema
const taskSchema = new mongoose.Schema({
    title: { required: true, type: String },
    description: { required: true, type: String },
    date: { type: Date, default: Date.now },
    status: {
        type: String,
        enum: ['To Do', 'In Progress', 'Completed'],
        default: 'To Do'
    },
    pinned: { type: Boolean, default: false },
    userId: { type: String, required: true } // firebase user oda uid store panrathuku

});

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
    },
    uid: {
        type: String,
        required: true,
        unique: true,
    },
    date: { type: Date, default: Date.now }

});

// Create Model
const taskModel = mongoose.model('Task', taskSchema);
const userModel = mongoose.model('User', userSchema);

//Signup 
app.post('/api/signup', async (req, res) => {
    const { email, uid } = req.body;
    try {
        if (!email || !uid) {
            return res.status(400).json({ error: 'Email and uid are required' });
        }

        const newUser = new userModel({
            email, uid
        });
        await newUser.save();
        res.status(201).json({ message: 'User saved successfully' });

    } catch (error) {
        console.error('Error saving user', error);
        res.status(500).json({ error: 'Failed to save user' });
    }
});

// Create New Task
app.post('/api/tasks', async (req, res) => {
    const { title, description, status, pinned, userId} = req.body;
    try {
        const newTask = new taskModel({ title, description, status, pinned, userId});
        await newTask.save();
        res.status(201).json(newTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Read Tasks
app.get('/api/tasks', async (req, res) => {
    const userId = req.query.userId; // Get userId from query
    if (!userId) {
        return res.status(400).json({ message: "User ID is required" });
    }
    try {
        const tasks = await taskModel.find({ userId }); // Filter tasks by userId
        res.status(200).json(tasks);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Update Task
app.put('/api/tasks/:id', async (req, res) => {
    const { title, description, status, pinned } = req.body;
    const id = req.params.id;
    try {
        const updatedTask = await taskModel.findByIdAndUpdate(
            id,
            { title, description, status, pinned },
            { new: true }
        );
        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.json(updatedTask);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Delete Task
app.delete('/api/tasks/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const task = await taskModel.findByIdAndDelete(id);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        res.status(204).end();
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});

// Start Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});
