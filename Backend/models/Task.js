// File path: models/Task.js

const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  subTasks: [
    {
      title: { type: String, required: true },
      tasks: [
        {
          type: { type: String, required: true },
          value: { type: String, required: true },
        },
      ],
    },
  ],
  assignOption: { type: String, required: true },
  students: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],  // Reference to students
  verified: { type: Boolean, default: false },
  rejected: { type: Boolean, default: false },
  rejectionReason: { type: String },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
