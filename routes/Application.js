const express = require('express');
const router = express.Router();
const { applyForJob,fetchJobApplications, fetchJobApplicationById, updateJobApplication } = require('../controller/Application');

// Route to create a new product
router.post('/applyforjob', applyForJob);

// Route to get all jobs from database
router.get('/getjobapplications/:jobId', fetchJobApplications);

// Route to fetch all products with optional filtering, pagination, and sorting
router.get('/fetchjobbyapplicationid/:id', fetchJobApplicationById);

// Route to fetch a product by its ID
router.put('/updateapplication/:id', updateJobApplication);

// Route to update a product by its ID


module.exports = router;