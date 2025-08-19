const express = require('express');
const router = express.Router();

// GET all users (placeholder)
router.get('/', (req, res) => {
  res.json({ message: 'Get all users - placeholder' });
});

// POST login (placeholder)
router.post('/login', (req, res) => {
  res.json({ message: 'Login endpoint - placeholder' });
});

module.exports = router;
