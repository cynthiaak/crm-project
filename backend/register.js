const express = require("express");
const bcrypt = require("bcryptjs"); //hash passwords
const pool = require("./db"); //conection with the db

const router = express.Router();    

router.post('/register', async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // basic validation
    if (!fullName || !email || !password) {
      return res.status(400).json({ error: 'fullName, email and password are required' });
    }

    // check if user exists
    const exists = await pool.query('SELECT 1 FROM users WHERE email = $1', [email]);
    if (exists.rowCount) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // hash password
    const hash = await bcrypt.hash(password, 10);

    // insert
    const insert =
      `INSERT INTO users (full_name, email, password)
       VALUES ($1, $2, $3)
       RETURNING id, full_name AS "fullName", email`;
    const r = await pool.query(insert, [fullName, email, hash]);

    res.status(201).json({ user: r.rows[0] });
  } catch (err) {
    
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});



router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body || {};
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    // Find user by email
    const sql = `
      SELECT id, full_name AS "fullName", email, password
      FROM users
      WHERE email = $1
      LIMIT 1
    `;
    const r = await pool.query(sql, [email]);
    const user = r.rows[0];
    if (!user) return res.status(401).json({ message: 'Invalid email or password' });

    // Compare bcrypt hash
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(401).json({ message: 'Invalid email or password' });

    const { id, fullName } = user;
    return res.status(200).json({ success: true, user: { id, fullName, email } });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;