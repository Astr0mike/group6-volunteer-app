const express = require('express');
const bcrypt = require('bcrypt');
const pool = require('../pool');
const router = express.Router();

const SALT_ROUNDS = 10;

// Register
router.post('/register', async (req, res) => {
  const { username, password } = req.body;

  // Validations
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }
  if (password.length < 6) {
    return res.status(400).json({ error: 'Password too short (min 6 chars).' });
  }

  try {
    const [existing] = await pool.query('SELECT * FROM UserCredentials WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username already exists.' });
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    await pool.query(
      'INSERT INTO UserCredentials (username, password_hash) VALUES (?, ?)',
      [username, hashedPassword]
    );

    res.status(201).json({ message: 'User registered.' });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

// Login
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password required.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM UserCredentials WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials.' });

    const user = rows[0];
    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials.' });

    res.status(200).json({ message: 'Login successful', user_id: user.user_id });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ error: 'Server error.' });
  }
});

module.exports = router;
