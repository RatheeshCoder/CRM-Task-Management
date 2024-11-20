// File path: routes/studentRoutes.js

const express = require('express');
const { addStudent,uploadCSV,upload , getStudents  } = require('../controllers/studentController');

const router = express.Router();

router.post('/students', addStudent);
router.post('/students/upload', upload, uploadCSV);
router.get('/students', getStudents);

module.exports = router;
