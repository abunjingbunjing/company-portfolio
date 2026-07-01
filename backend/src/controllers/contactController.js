const prisma = require('../db/prisma');

// Public — create only, never update/delete from this side
async function submitContact(req, res) {
  try {
    const { name, email, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const submission = await prisma.contactSubmission.create({
      data: { name, email, message, status: 'new' },
    });
    res.status(201).json({ message: 'Submitted successfully', id: submission.id });
  } catch (err) {
    res.status(500).json({ error: 'Failed to submit message' });
  }
}

// Admin — list, with optional status filter: GET /api/contact?status=new
async function getAllSubmissions(req, res) {
  try {
    const { status } = req.query;
    const where = status ? { status } : {};
    const submissions = await prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: 'desc' },
    });
    res.json(submissions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch submissions' });
  }
}

// Admin — update status only (new/read/archived). Name/email/message stay immutable.
async function updateSubmissionStatus(req, res) {
  try {
    const { status } = req.body;
    const validStatuses = ['new', 'read', 'archived'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: 'Status must be one of: new, read, archived' });
    }
    const submission = await prisma.contactSubmission.update({
      where: { id: req.params.id },
      data: { status },
    });
    res.json(submission);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update submission status' });
  }
}

module.exports = { submitContact, getAllSubmissions, updateSubmissionStatus };