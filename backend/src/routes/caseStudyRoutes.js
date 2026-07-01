const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  getAllCaseStudies, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy,
} = require('../controllers/caseStudyController');

router.get('/', getAllCaseStudies);
router.get('/:id', getCaseStudyById);
router.post('/', verifyToken, createCaseStudy);
router.put('/:id', verifyToken, updateCaseStudy);
router.delete('/:id', verifyToken, deleteCaseStudy);

module.exports = router;