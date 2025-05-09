// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); // For JSON request bodies

// Route files
const auth = require('./routes/auth');
const messages = require('./routes/messages');

// Mount routers
app.use('/api/v1/auth', auth);
app.use('/api/v1/messages', messages);

// Error handling middleware (add at end)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false, 
    error: 'Server Error' 
  });
});

// Basic health check route
app.get('/', (req, res) => {
  res.send('Triway Message Center API is running');
});

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes