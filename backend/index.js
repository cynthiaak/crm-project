const express = require('express');
const cors = require('cors');          
require('dotenv').config();            
const pool = require('./db');   
const registerRoutes = require("./register");  

const app = express();
const PORT = process.env.PORT || 3000;

// ✅ CORS must come before routes
app.use(cors({
  origin: ['http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

app.use(express.json());

// ✅ Register routes
app.use("/auth", registerRoutes);

// Health check
app.get('/', (_req, res) => res.send('API is running!'));

// DB health
app.get('/db/health', async (_req, res) => {
  try {
    const r = await pool.query('SELECT NOW() AS now');
    res.json({ ok: true, now: r.rows[0].now });
  } catch (err) {
    console.error(err);
    res.status(500).json({ ok: false, error: err.message });
  }
});

// Optional: remove this login if you are using DB login instead
// const users = [ { email: "test@gmail.com", password: "12345" } ];
// app.post("/login", (req, res) => { ... });

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
