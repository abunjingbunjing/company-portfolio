const prisma = require('../db/prisma');

async function getAllServices(req, res) {
  try {
    const services = await prisma.service.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch services' });
  }
}

async function getServiceById(req, res) {
  try {
    const service = await prisma.service.findUnique({ where: { id: req.params.id } });
    if (!service) return res.status(404).json({ error: 'Service not found' });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch service' });
  }
}

async function createService(req, res) {
  try {
    const { title, description, backgroundColor, iconName, iconUrl, websiteUrl, sortOrder, isActive } = req.body;
    if (!title || !description) {
      return res.status(400).json({ error: 'Title and description are required' });
    }
    const allowedColors = ["green", "gray", "white"];
    if (
      backgroundColor &&
      !allowedColors.includes(backgroundColor)
    ) {
      return res.status(400).json({
        error: "Invalid background color.",
      });
    }
    const service = await prisma.service.create({
      data: { title, description, backgroundColor: backgroundColor || "gray", iconName, iconUrl, websiteUrl, sortOrder: Number(sortOrder) || 0, isActive: isActive ?? true },
    });
    res.status(201).json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create service' });
  }
}

async function updateService(req, res) {
  try {
    const { title, description, backgroundColor, iconUrl, websiteUrl, sortOrder, isActive } = req.body;
    const service = await prisma.service.update({
      where: { id: req.params.id },
      data: { title, description, backgroundColor: backgroundColor || "gray", iconUrl, websiteUrl, sortOrder: Number(sortOrder) || 0, isActive: isActive ?? true },
    });
    res.json(service);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update service' });
  }
}

async function deleteService(req, res) {
  try {
    await prisma.service.delete({ where: { id: req.params.id } });
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete service' });
  }
}

module.exports = { getAllServices, getServiceById, createService, updateService, deleteService };