const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { submitContact, getAllSubmissions, updateSubmissionStatus } = require('../controllers/contactController');

router.post('/', submitContact);
router.get('/', verifyToken, getAllSubmissions);
router.patch('/:id/status', verifyToken, updateSubmissionStatus);

module.exports = router;