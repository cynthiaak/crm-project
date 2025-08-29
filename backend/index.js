const express = require('express');
const cors = require('cors');          
require('dotenv').config();            // only needed if you use a .env
const pool = require('./db');   

const app = express();
const PORT = process.env.PORT || 3000;
const router = express.Router();
const users = [
  { email: "test@gmail.com", password: "12345" }
];
app.use(cors({origin: ['http://localhost:5173']}));
app.use(express.json());

// Health check for API
app.get('/', (_req, res) => {res.send('API is running!');});
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


app.post("/login", (req, res) => {
  const {email, password} = req.body;
  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.status(200).json({ message: "Login successful", success: true });
  } else {
    res.status(401).json({ message: "Login failed", success: false });
  }
});
const registerRoutes = require("./register");
app.use("/auth", registerRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
