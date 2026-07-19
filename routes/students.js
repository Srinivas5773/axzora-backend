const express = require('express');
const router = express.Router();

// Mock student data (replace with real database)
const students = [
  {
    email: 'student1@example.com',
    fullName: 'John Doe',
    jobsCount: 5,
    priority: 'High',
    completionStatus: 'incomplete',
    screenshotNeeded: false
  },
  {
    email: 'student2@example.com', 
    fullName: 'Jane Smith',
    jobsCount: 3,
    priority: 'Normal',
    completionStatus: 'complete',
    screenshotNeeded: true
  }
];

// Get assigned students
router.get('/assigned-students', (req, res) => {
  res.json({
    success: true,
    students: students
  });
});

// Get students summary
router.get('/students-summary', (req, res) => {
  res.json({
    success: true,
    students: students
  });
});

// Get student info
router.get('/student-info', (req, res) => {
  const { email } = req.query;
  const student = students.find(s => s.email === email);
  
  if (student) {
    res.json({
      success: true,
      studentInfo: {
        email: student.email,
        personalData: {
          email: student.email,
          password: 'password123',
          requireVisaSponsorshipNow: 'No',
          requireVisaSponsorshipFuture: 'Yes',
          doNotApplyCompanies: ['Company A', 'Company B']
        }
      }
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
});

// Submit screenshot
router.post('/submit-screenshot', (req, res) => {
  const { email, date } = req.body;
  res.json({
    success: true,
    message: 'Screenshot submitted successfully'
  });
});

// Get screenshot status
router.get('/screenshot-status', (req, res) => {
  const { email } = req.query;
  res.json({
    success: true,
    submitted: false
  });
});

// Get student completion status
router.get('/student-completion-status', (req, res) => {
  const { email } = req.query;
  const student = students.find(s => s.email === email);
  
  if (student) {
    res.json({
      success: true,
      completionStatus: student.completionStatus
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Student not found'
    });
  }
});

// Student notes
router.get('/student-notes', (req, res) => {
  const { email } = req.query;
  res.json({
    success: true,
    notes: ''
  });
});

module.exports = router;
