const prisma = require('../db/prisma');

async function getAllWorkingProcessSteps(req, res) {
  try {
    const steps = await prisma.workingProcess.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(steps);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch working process steps' });
  }
}

async function getWorkingProcessStepById(req, res) {
  try {
    const step = await prisma.workingProcess.findUnique({ where: { id: req.params.id } });
    if (!step) return res.status(404).json({ error: 'Step not found' });
    res.json(step);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch step' });
  }
}

async function createWorkingProcessStep(req, res) {
  try {
    const { stepNo, title, description, sortOrder, isActive } = req.body;
    if (!stepNo || !title || !description) {
      return res.status(400).json({ error: 'stepNo, title, and description are required' });
    }
    const step = await prisma.workingProcess.create({
      data: { stepNo, title, description, sortOrder, isActive },
    });
    res.status(201).json(step);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create step' });
  }
}

async function updateWorkingProcessStep(req, res) {
  try {
    const { stepNo, title, description, sortOrder, isActive } = req.body;
    const step = await prisma.workingProcess.update({
      where: { id: req.params.id },
      data: { stepNo, title, description, sortOrder, isActive },
    });
    res.json(step);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update step' });
  }
}

async function deleteWorkingProcessStep(req, res) {
  try {
    await prisma.workingProcess.delete({ where: { id: req.params.id } });
    res.json({ message: 'Step deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete step' });
  }
}

module.exports = {
  getAllWorkingProcessSteps,
  getWorkingProcessStepById,
  createWorkingProcessStep,
  updateWorkingProcessStep,
  deleteWorkingProcessStep,
};