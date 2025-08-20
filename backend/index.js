const express = require('express');
const cors = require('cors');
const pool = require('./db');          // <- your PostgreSQL pool from db.js
require('dotenv').config();            // only needed if you use a .env

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Health check for API
app.get('/', (_req, res) => {
  res.send('API is running!');
});

//check DB health
app.get('/db/health', async (_req, res) => {
  try {
    const r = await pool.query('SELECT NOW() AS now');
    res.json({ ok: true, now: r.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

//check user route is working (make sure a users table exists in your CRM DB)
app.get('/users', async (_req, res) => {
  try {
    const r = await pool.query('SELECT id, email, full_name FROM users ORDER BY id');
    res.json(r.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
