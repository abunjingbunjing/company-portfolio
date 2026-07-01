const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const {
  getAllTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember, uploadTeamImage,
} = require('../controllers/teamController');

const upload = require("../middleware/uploadTeamImage");



router.get('/', getAllTeamMembers);
router.get('/:id', getTeamMemberById);
router.post('/', verifyToken, createTeamMember);
router.put('/:id', verifyToken, updateTeamMember);
router.delete('/:id', verifyToken, deleteTeamMember);
router.post(
    "/upload",
    verifyToken,
    upload.single("image"),
    uploadTeamImage,
);

module.exports = router;