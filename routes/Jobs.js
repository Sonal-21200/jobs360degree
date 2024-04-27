const express = require('express');
const router = express.Router();
const { createJob,getAllJobs, fetchAllJob, fetchJobById, updateJob,searchJobs } = require('../controller/Jobs');

// Route to create a new product
router.post('/createjob', createJob);

// Route to get all jobs from database
router.get('/getalljobs', getAllJobs);

// Route to fetch all products with optional filtering, pagination, and sorting
router.get('/getjobsbycategory', fetchAllJob);

// Route to fetch a product by its ID
router.get('/:id', fetchJobById);

// Route to update a product by its ID
router.put('/:id', updateJob);

//Route to search a job
router.get('/searchjobs', searchJobs);

module.exports = router;