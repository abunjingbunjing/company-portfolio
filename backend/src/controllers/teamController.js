const prisma = require('../db/prisma');

function parseSocials(socialsJson) {
  try {
    return socialsJson ? JSON.parse(socialsJson) : {};
  } catch {
    return {};
  }
}

async function getAllTeamMembers(req, res) {
  try {
    const members = await prisma.teamMember.findMany({
      where: { isActive: true },
      orderBy: { sortOrder: 'asc' },
    });
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team members' });
  }
}

async function getTeamMemberById(req, res) {
  try {
    const member = await prisma.teamMember.findUnique({ where: { id: req.params.id } });
    if (!member) return res.status(404).json({ error: 'Team member not found' });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch team member' });
  }
}

async function createTeamMember(req, res) {
  try {
    const { name, role, avatarUrl, socialsJson, sortOrder, isActive } = req.body;
    if (!name || !role) {
      return res.status(400).json({ error: 'Name and role are required' });
    }
    const member = await prisma.teamMember.create({
      data: { name, role, avatarUrl, socialsJson, sortOrder, isActive },
    });
    res.status(201).json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to create team member' });
  }
}

async function updateTeamMember(req, res) {
  try {
    const { name, role, avatarUrl, socialsJson, sortOrder, isActive } = req.body;
    const member = await prisma.teamMember.update({
      where: { id: req.params.id },
      data: { name, role, avatarUrl, socialsJson, sortOrder, isActive },
    });
    res.json(member);
  } catch (err) {
    res.status(500).json({ error: 'Failed to update team member' });
  }
}

async function deleteTeamMember(req, res) {
  try {
    await prisma.teamMember.delete({ where: { id: req.params.id } });
    res.json({ message: 'Team member deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete team member' });
  }
}

function uploadTeamImage(req, res) {
  if (!req.file) {
    return res.status(400).json({
      error: "No file uploaded",
    });
  }

  res.json({
    url: `/uploads/team/${req.file.filename}`,
  });
}

module.exports = {
  getAllTeamMembers,
  getTeamMemberById,
  createTeamMember,
  updateTeamMember,
  deleteTeamMember,
  uploadTeamImage,
};

