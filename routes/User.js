const express = require('express');
const router = express.Router();
const { fetchUserById, updateUser,resumeUploader,uploadResume } = require('../controller/User');

// Route to fetch a user by their ID
router.get('/:id', fetchUserById);

// Route to update a user by their ID
router.put('/:id', updateUser);
//Route to update resume
router.post('/user/:id/upload-resume', resumeUploader, uploadResume);
module.exports = router;