const express = require('express');
const router = express.Router();
const linkedinController = require('../controllers/linkedinController');

// Route to create LinkedIn text post
router.post('/linkedin/text', linkedinController.createTextPost);

// Route to create LinkedIn article post
router.post('/linkedin/article', linkedinController.createArticlePost);

module.exports = router;
