const pool = require('../pool');
const { validateUserProfile } = require('../validation/userProfileValidation');

function safeParseJson(value) {
  if (value == null) return value;
  if (typeof value === 'object') return value;
  try {
    return JSON.parse(value);
  } catch {
    return String(value)
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);
  }
}

function normalizeArrayField(field) {
  if (Array.isArray(field)) return field;
  if (typeof field === 'string') {
    return field.split(',').map(s => s.trim()).filter(Boolean);
  }
  return [];
}

// CREATE
exports.createUserProfile = async (req, res) => {
  console.log('createUserProfile payload:', req.body);

  const { isValid, errors } = validateUserProfile(req.body);
  if (!isValid) return res.status(400).json({ errors });

  const {
    username,
    fullName,
    address1,
    address2,
    city,
    state,
    zip,
    skills,
    otherSkills,
    preferences,
    availability
  } = req.body;

  const normalizedSkills = normalizeArrayField(skills);
  const normalizedAvailability = normalizeArrayField(availability);

  try {
    const [result] = await pool.query(
      `INSERT INTO \`UserProfile\`
        (username, full_name, address1, address2,
         city, state, zip, skills,
         other_skills, preferences, availability)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);`,
      [
        username,
        fullName,
        address1,
        address2 || null,
        city,
        state,
        zip,
        JSON.stringify(normalizedSkills),
        otherSkills || null,
        preferences || null,
        JSON.stringify(normalizedAvailability)
      ]
    );

    const [rows] = await pool.query(
      'SELECT * FROM `UserProfile` WHERE id = ?',
      [result.insertId]
    );
    const profile = rows[0];
    profile.skills = safeParseJson(profile.skills);
    profile.availability = safeParseJson(profile.availability);

    res.status(201).json({
      message: 'User profile created successfully!',
      profile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Database error',
      details: err.message,
      stack: err.stack
    });
  }
};

// READ (by ID)
exports.getUserProfileById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const [rows] = await pool.query(
      'SELECT * FROM `UserProfile` WHERE id = ?',
      [id]
    );
    if (!rows.length) return res.status(404).json({ error: 'Profile not found' });

    const profile = rows[0];
    profile.skills = safeParseJson(profile.skills);
    profile.availability = safeParseJson(profile.availability);

    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Database error',
      details: err.message,
      stack: err.stack
    });
  }
};

// READ ALL
exports.getAllUserProfiles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `UserProfile`');
    const profiles = rows.map(r => ({
      ...r,
      skills: safeParseJson(r.skills),
      availability: safeParseJson(r.availability)
    }));
    res.json({ profiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Database error',
      details: err.message,
      stack: err.stack
    });
  }
};

// UPDATE
exports.updateUserProfile = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log('updateUserProfile payload:', req.body);

  const { isValid, errors } = validateUserProfile(req.body);
  if (!isValid) return res.status(400).json({ errors });

  const {
    fullName,
    address1,
    address2,
    city,
    state,
    zip,
    skills,
    otherSkills,
    preferences,
    availability
  } = req.body;

  const normalizedSkills = normalizeArrayField(skills);
  const normalizedAvailability = normalizeArrayField(availability);

  try {
    const [result] = await pool.query(
      `UPDATE \`UserProfile\` SET
         full_name    = ?,
         address1     = ?,
         address2     = ?,
         city         = ?,
         state        = ?,
         zip          = ?,
         skills       = ?,
         other_skills = ?,
         preferences  = ?,
         availability = ?,
         updated_at   = CURRENT_TIMESTAMP
       WHERE id = ?;`,
      [
        fullName,
        address1,
        address2 || null,
        city,
        state,
        zip,
        JSON.stringify(normalizedSkills),
        otherSkills || null,
        preferences || null,
        JSON.stringify(normalizedAvailability),
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    const [rows] = await pool.query(
      'SELECT * FROM `UserProfile` WHERE id = ?',
      [id]
    );
    const profile = rows[0];
    profile.skills = safeParseJson(profile.skills);
    profile.availability = safeParseJson(profile.availability);

    res.json({ message: 'Profile updated successfully!', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Database error',
      details: err.message,
      stack: err.stack
    });
  }
};

// DELETE
exports.deleteUserProfile = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  try {
    const [result] = await pool.query(
      'DELETE FROM `UserProfile` WHERE id = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }
    res.json({ message: 'Profile deleted successfully!' });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: 'Database error',
      details: err.message,
      stack: err.stack
    });
  }
};
