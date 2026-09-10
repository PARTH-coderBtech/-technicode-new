const express = require('express');
const router = express.Router();
const { applyInternship } = require('../controllers/mailController');


const {
  createApplication,
  getAllApplications,
  getMyApplications,
  getActiveInternships,
  updateApplicationStatus,
} = require(
  "../controllers/applicationController"
);


// Create application

router.post('/',createApplication, applyInternship);


// Get all applications

router.get(
  "/applications",
  getAllApplications
);


// Get logged user applications

router.get(
  "/my-applications",
  getMyApplications
);


// Get active internships

router.get(
  "/active-internships",
  getActiveInternships
);


// Update status

router.patch(
  "/applications/:id/status",
  updateApplicationStatus
);


module.exports = router;
