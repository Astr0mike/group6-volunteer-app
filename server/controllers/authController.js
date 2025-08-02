const bcrypt = require('bcrypt');
const pool = require('../pool'); // your existing MySQL pool

const SALT_ROUNDS = 10;

// Register user
exports.registerUser = async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password || password.length < 6) {
    return res.status(400).json({ error: 'Username and password (min 6 chars) are required.' });
  }

  try {
    // Check if user exists
    const [existing] = await pool.query('SELECT * FROM UserCredentials WHERE username = ?', [username]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Username already taken' });
    }

    // Hash password
    const password_hash = await bcrypt.hash(password, SALT_ROUNDS);

    // Insert into DB
    await pool.query(
      'INSERT INTO UserCredentials (username, password_hash) VALUES (?, ?)',
      [username, password_hash]
    );

    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Error in registerUser:', err);
    res.status(500).json({ error: 'Server error' });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  // Validation
  if (!username || !password) {
    return res.status(400).json({ error: 'Username and password are required.' });
  }

  try {
    const [rows] = await pool.query('SELECT * FROM UserCredentials WHERE username = ?', [username]);
    if (!rows.length) return res.status(401).json({ error: 'Invalid credentials' });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password_hash);
    if (!match) return res.status(401).json({ error: 'Invalid credentials' });

    res.status(200).json({ message: 'Login successful', user_id: user.user_id });
  } catch (err) {
    console.error('Error in loginUser:', err);
    res.status(500).json({ error: 'Server error' });
  }
};
