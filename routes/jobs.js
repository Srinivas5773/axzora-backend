const express = require('express');
const multer = require('multer');
const router = express.Router();

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// Mock job data (replace with real database)
const jobs = [
  {
    jobId: 'job1',
    email: 'student1@example.com',
    jobLink: 'https://example.com/job1',
    jobDescription: 'Software Engineer position at Tech Company',
    jobNumber: 1,
    resumePath: '/resumes/student1.pdf',
    timestamp: Date.now(),
    doNotApplyReview: false,
    doNotApplyCompany: ''
  }
];

// Get student jobs
router.get('/student-jobs', (req, res) => {
  const { email } = req.query;
  const studentJobs = jobs.filter(j => j.email === email);
  
  if (studentJobs.length > 0) {
    res.json({
      success: true,
      job: studentJobs[0]
    });
  } else {
    res.json({
      success: true,
      job: null
    });
  }
});

// Mark job as started
router.post('/mark-job-started', (req, res) => {
  const { jobId, studentEmail } = req.body;
  res.json({
    success: true,
    message: 'Job marked as started'
  });
});

// Mark job as applied
router.post('/mark-job-applied', (req, res) => {
  const { jobId, studentEmail } = req.body;
  res.json({
    success: true,
    message: 'Job marked as applied'
  });
});

// Get job resume
router.get('/job-resume', (req, res) => {
  const { jobId, email } = req.query;
  res.json({
    success: true,
    resumePath: '/resumes/student1.pdf'
  });
});

// Target compensation
router.post('/target-compensation', (req, res) => {
  const { jobId, compensation } = req.body;
  res.json({
    success: true,
    message: 'Target compensation saved'
  });
});

// Come at last
router.post('/come-at-last', (req, res) => {
  const { jobId, studentEmail } = req.body;
  res.json({
    success: true,
    message: 'Job marked for later'
  });
});

// Skip job
router.post('/skip-job', (req, res) => {
  const { jobId, studentEmail, reason } = req.body;
  res.json({
    success: true,
    message: 'Job skipped'
  });
});

// Upload recording
router.post('/upload-recording', upload.single('video'), (req, res) => {
  const { jobId, studentEmail, applierEmail, recorded, action, durationMinutes, uploadedDurationMinutes, trimmed } = req.body;
  
  console.log(`Recording upload: ${jobId}, ${studentEmail}, ${action}, ${durationMinutes}m`);
  
  res.json({
    success: true,
    message: 'Recording uploaded successfully'
  });
});

module.exports = router;
