const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  getAllWorkingProcessSteps,
  getWorkingProcessStepById,
  createWorkingProcessStep,
  updateWorkingProcessStep,
  deleteWorkingProcessStep,
} = require('../controllers/workingProcessController');

router.get('/', getAllWorkingProcessSteps);
router.get('/:id', getWorkingProcessStepById);
router.post('/', verifyToken, createWorkingProcessStep);
router.put('/:id', verifyToken, updateWorkingProcessStep);
router.delete('/:id', verifyToken, deleteWorkingProcessStep);

module.exports = router;