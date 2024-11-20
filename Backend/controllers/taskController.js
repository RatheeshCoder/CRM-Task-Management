// File path: controllers/taskController.js

const Task = require('../models/Task');
const Student = require('../models/Student');
const { sendWhatsAppMessage } = require('../services/whatsappService');

exports.assignTask = async (req, res) => {
  const { title, subTasks, assignOption, selectedStudents } = req.body;

  try {
    const task = new Task({
      title,
      subTasks,
      assignOption,
      students: assignOption === 'selected' ? selectedStudents : [],
    });

    await task.save();

    // Prepare the message template
    let message = `📋 *New Task Assigned: ${title}*\n\n`;

    subTasks.forEach((subTask, index) => {
      message += `🔹 *Sub Task ${index + 1}: ${subTask.title}*\n`;
      subTask.tasks.forEach((task, taskIndex) => {
        message += `   - ${task.type.charAt(0).toUpperCase() + task.type.slice(1)}: ${task.value}\n`;
      });
      message += '\n';
    });

    // Send WhatsApp messages
    let studentsToNotify;
    if (assignOption === 'all') {
      studentsToNotify = await Student.find({});
    } else if (assignOption === 'selected') {
      studentsToNotify = await Student.find({ _id: { $in: selectedStudents } });
    }

    for (const student of studentsToNotify) {
      await sendWhatsAppMessage(student.phoneNumber, message);
    }

    res.status(201).json({ message: 'Task assigned and WhatsApp messages sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error assigning task', error });
  }
};


exports.verifyTask = async (req, res) => {
  const { taskId } = req.params;

  try {
    const task = await Task.findById(taskId);
    task.verified = true;
    await task.save();

    res.status(200).json({ message: 'Task verified successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error verifying task', error });
  }
};

exports.rejectTask = async (req, res) => {
  const { taskId } = req.params;
  const { reason } = req.body;

  try {
    const task = await Task.findById(taskId);
    task.rejected = true;
    task.rejectionReason = reason;
    await task.save();

    const student = await Student.findById(task.student);
    const message = `Your task "${task.title}" was rejected for the following reason: ${reason}`;
    await sendWhatsAppMessage(student.phoneNumber, message);

    res.status(200).json({ message: 'Task rejected and WhatsApp message sent successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error rejecting task', error });
  }
};

exports.getStudentDetails = async (req, res) => {
  try {
    const students = await Student.find().populate('tasks');
    res.status(200).json({ students });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching student details', error });
  }
};