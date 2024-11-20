// File path: routes/taskRoutes.js

const express = require('express');
const { assignTask ,verifyTask, rejectTask, getStudentDetails} = require('../controllers/taskController');

const router = express.Router();

router.post('/tasks', assignTask);
router.post('/tasks/verify/:taskId', verifyTask);
router.post('/tasks/reject/:taskId', rejectTask);
router.get('/students/details', getStudentDetails);

module.exports = router;
