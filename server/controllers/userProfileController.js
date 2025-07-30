const pool = require('../pool');
const { validateUserProfile } = require('../validation/userProfileValidation');

// CREATE
exports.createUserProfile = async (req, res) => {
  const { isValid, errors } = validateUserProfile(req.body);
  if (!isValid) return res.status(400).json({ errors });

  const {
    username, fullName, address1, address2,
    city, state, zip, skills,
    otherSkills, preferences, availability
  } = req.body;

  try {
    const skillsJson       = JSON.stringify(skills);
    const availabilityJson = JSON.stringify(availability);

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
        skillsJson,
        otherSkills || null,
        preferences || null,
        availabilityJson
      ]
    );

    const [rows] = await pool.query(
      'SELECT * FROM `UserProfile` WHERE id = ?',
      [result.insertId]
    );
    const profile = rows[0];
    profile.skills       = JSON.parse(profile.skills);
    profile.availability = JSON.parse(profile.availability);

    res.status(201).json({
      message: 'User profile created successfully!',
      profile
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
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
    profile.skills       = JSON.parse(profile.skills);
    profile.availability = JSON.parse(profile.availability);

    res.json({ profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


exports.getAllUserProfiles = async (req, res) => {
  try {
    const [rows] = await pool.query('SELECT * FROM `UserProfile`');
    // parse JSON columns
    const profiles = rows.map(r => ({
      ...r,
      skills: JSON.parse(r.skills),
      availability: JSON.parse(r.availability)
    }));
    res.json({ profiles });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};


// UPDATE
exports.updateUserProfile = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { isValid, errors } = validateUserProfile(req.body);
  if (!isValid) return res.status(400).json({ errors });

  const {
    fullName, address1, address2,
    city, state, zip, skills,
    otherSkills, preferences, availability
  } = req.body;

  try {
    const skillsJson       = JSON.stringify(skills);
    const availabilityJson = JSON.stringify(availability);

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
        skillsJson,
        otherSkills || null,
        preferences || null,
        availabilityJson,
        id
      ]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Profile not found' });
    }

    // Return the updated row
    const [rows] = await pool.query(
      'SELECT * FROM `UserProfile` WHERE id = ?',
      [id]
    );
    const profile = rows[0];
    profile.skills       = JSON.parse(profile.skills);
    profile.availability = JSON.parse(profile.availability);

    res.json({ message: 'Profile updated successfully!', profile });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Database error' });
  }
};

//DELETE
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
    res.status(500).json({ error: 'Database error' });
  }
};
