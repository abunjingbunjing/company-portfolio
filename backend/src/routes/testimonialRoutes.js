const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  getAllTestimonials, getTestimonialById, createTestimonial, updateTestimonial, deleteTestimonial,
} = require('../controllers/testimonialController');

router.get('/', getAllTestimonials);
router.get('/:id', getTestimonialById);
router.post('/', verifyToken, createTestimonial);
router.put('/:id', verifyToken, updateTestimonial);
router.delete('/:id', verifyToken, deleteTestimonial);

module.exports = router;