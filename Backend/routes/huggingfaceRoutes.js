const express = require('express');
const router = express.Router();
const { generateJobContent } = require('../controllers/huggingfaceController');

router.post('/generate-job-content', generateJobContent);

module.exports = router;
