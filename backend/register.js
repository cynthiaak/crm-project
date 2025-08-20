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

module.exports = router;