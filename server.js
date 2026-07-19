require('dotenv').config();
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const studentRoutes = require('./routes/students');
const jobRoutes = require('./routes/jobs');
const aiRoutes = require('./routes/ai');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/axzora', authRoutes);
app.use('/api/axzora', studentRoutes);
app.use('/api/axzora', jobRoutes);
app.use('/api/axzora', aiRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Axzora Backend is running' });
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, message: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`Axzora Backend running on port ${PORT}`);
});
