const prisma = require('../db/prisma');

async function getAllCaseStudies(req, res) {
  try {
    const caseStudies = await prisma.caseStudy.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(caseStudies);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch case studies' });
  }
}

async function getCaseStudyById(req, res) {
  try {
    const caseStudy = await prisma.caseStudy.findUnique({ where: { id: req.params.id } });
    if (!caseStudy) return res.status(404).json({ error: 'Case study not found' });
    res.json(caseStudy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch case study' });
  }
}

async function createCaseStudy(req, res) {
  try {
    const { title, shortDescription, coverImageUrl, linkUrl, tags, sortOrder, isActive } = req.body;
    if (!title || !shortDescription) {
      return res.status(400).json({ error: 'Title and short description are required' });
    }
    const caseStudy = await prisma.caseStudy.create({
      data: { title, shortDescription, coverImageUrl, linkUrl, tags, sortOrder, isActive },
    });
    res.status(201).json(caseStudy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create case study' });
  }
}

async function updateCaseStudy(req, res) {
  try {
    const { title, shortDescription, coverImageUrl, linkUrl, tags, sortOrder, isActive } = req.body;
    const caseStudy = await prisma.caseStudy.update({
      where: { id: req.params.id },
      data: { title, shortDescription, coverImageUrl, linkUrl, tags, sortOrder, isActive },
    });
    res.json(caseStudy);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update case study' });
  }
}

async function deleteCaseStudy(req, res) {
  try {
    await prisma.caseStudy.delete({ where: { id: req.params.id } });
    res.json({ message: 'Case study deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete case study' });
  }
}

module.exports = { getAllCaseStudies, getCaseStudyById, createCaseStudy, updateCaseStudy, deleteCaseStudy };