const prisma = require('../db/prisma');

async function getAllTestimonials(req, res) {
  try {
    const testimonials = await prisma.testimonial.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonials' });
  }
}

async function getTestimonialById(req, res) {
  try {
    const testimonial = await prisma.testimonial.findUnique({ where: { id: req.params.id } });
    if (!testimonial) return res.status(404).json({ error: 'Testimonial not found' });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch testimonial' });
  }
}

async function createTestimonial(req, res) {
  try {
    const { name, roleCompany, message, avatarUrl, rating, sortOrder, isActive } = req.body;
    if (!name || !message) {
      return res.status(400).json({ error: 'Name and message are required' });
    }
    const testimonial = await prisma.testimonial.create({
      data: { name, roleCompany, message, avatarUrl, rating, sortOrder, isActive },
    });
    res.status(201).json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create testimonial' });
  }
}

async function updateTestimonial(req, res) {
  try {
    const { name, roleCompany, message, avatarUrl, rating, sortOrder, isActive } = req.body;
    const testimonial = await prisma.testimonial.update({
      where: { id: req.params.id },
      data: { name, roleCompany, message, avatarUrl, rating, sortOrder, isActive },
    });
    res.json(testimonial);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update testimonial' });
  }
}

async function deleteTestimonial(req, res) {
  try {
    await prisma.testimonial.delete({ where: { id: req.params.id } });
    res.json({ message: 'Testimonial deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete testimonial' });
  }
}

module.exports = {
  getAllTestimonials,
  getTestimonialById,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
};