const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'axzora-secret-key';

// Mock user database (replace with real database)
const users = [
  { id: 1, username: 'admin', password: 'admin123', name: 'Axzora Admin' }
];

// Login
router.post('/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = users.find(u => u.username === username && u.password === password);
  
  if (user) {
    const token = jwt.sign(
      { userId: user.id, username: user.username },
      JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    res.json({
      success: true,
      token,
      jobApplierName: user.name,
      jobapplierId: user.id,
      expiresIn: 86400
    });
  } else {
    res.status(401).json({
      success: false,
      message: 'Invalid credentials'
    });
  }
});

// Logout
router.post('/logout', (req, res) => {
  res.json({ success: true, message: 'Logged out successfully' });
});

// Version check
router.get('/version-check', (req, res) => {
  const { version } = req.query;
  res.json({
    success: true,
    upToDate: true,
    message: 'Extension is up to date'
  });
});

module.exports = router;
