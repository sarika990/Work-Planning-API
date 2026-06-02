const mongoose = require("mongoose");

// Delete any previously cached model to ensure schema changes take effect
if (mongoose.models.Task) {
    delete mongoose.models.Task;
}

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    dueDate: {
        type: String
    },
    status: {
        type: String,
        enum: ['complete', 'pending', 'notcomplete'],
        default: 'pending'
    }
});

module.exports = mongoose.model("Task", taskSchema);