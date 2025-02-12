const express = require('express');
const router = express.Router();
const { getJobs , jobsInterestedIn} = require('../controllers/jobControllers');


router.post('/jobs' , getJobs);
router.get('/jobsInterestedIn' , jobsInterestedIn);

module.exports = router;