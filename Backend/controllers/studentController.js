// File path: controllers/studentController.js

const Student = require('../models/Student');
const csv = require('csv-parser');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const upload = multer({ dest: 'uploads/' });
exports.addStudent = async (req, res) => {
  const { name, department, fatherName, phoneNumber, collegeID, emailID, address, section } = req.body;
  try {
    const newStudent = new Student({
      name,
      department,
      fatherName,
      phoneNumber,
      collegeID,
      emailID,
      address,
      section
    });
    await newStudent.save();
    res.status(201).json({ message: 'Student added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error adding student', error });
  }
};


exports.uploadCSV = async (req, res) => {
    const results = [];
  
    fs.createReadStream(req.file.path)
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', async () => {
        try {
          await Student.insertMany(results);
          fs.unlinkSync(req.file.path); // Remove the uploaded file
          res.status(201).json({ message: 'CSV file processed and data saved successfully' });
        } catch (error) {
          res.status(500).json({ message: 'Error processing CSV file', error });
        }
      });
  };
  
  exports.upload = upload.single('file');



  exports.getStudents = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 10;
      const skip = (page - 1) * limit;
  
      const students = await Student.find().skip(skip).limit(limit);
      const total = await Student.countDocuments();
  
      res.status(200).json({ students, total, page, pages: Math.ceil(total / limit) });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching students', error });
    }
  };