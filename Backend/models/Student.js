// File path: models/Student.js

const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  fatherName: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  collegeID: { type: String, required: true },
  emailID: { type: String, required: true },
  address: { type: String, required: true },
  section: { type: String, required: true },
  tasks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]  // Reference to tasks
});

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
