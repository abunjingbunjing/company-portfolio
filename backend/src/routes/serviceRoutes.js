const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  getAllServices, getServiceById, createService, updateService, deleteService,
} = require('../controllers/serviceController');

router.get('/', getAllServices);
router.get('/:id', getServiceById);
router.post('/', verifyToken, createService);
router.put('/:id', verifyToken, updateService);
router.delete('/:id', verifyToken, deleteService);

module.exports = router;