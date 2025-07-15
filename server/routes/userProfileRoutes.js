const express = require('express');
const router = express.Router();

let userProfiles = [];

// Validation function
function validateUserProfile(profile) {
  if (
    !profile.fullName ||
    typeof profile.fullName !== 'string' ||
    profile.fullName.length > 50
  ) {
    return 'Full name is required and must be less than 50 characters.';
  }

  if (
    !profile.address1 ||
    typeof profile.address1 !== 'string' ||
    profile.address1.length > 100
  ) {
    return 'Address 1 is required and must be less than 100 characters.';
  }

  if (
    profile.address2 &&
    (typeof profile.address2 !== 'string' || profile.address2.length > 100)
  ) {
    return 'Address 2 must be less than 100 characters.';
  }

  if (
    !profile.city ||
    typeof profile.city !== 'string' ||
    profile.city.length > 100
  ) {
    return 'City is required and must be less than 100 characters.';
  }

  if (
    !profile.state ||
    typeof profile.state !== 'string' ||
    profile.state.length !== 2
  ) {
    return 'State is required and must be a 2-letter code.';
  }

  if (
    !profile.zip ||
    typeof profile.zip !== 'string' ||
    !/^\d{5,9}$/.test(profile.zip)
  ) {
    return 'Zip code is required and must be 5 to 9 digits.';
  }

  if (
    !Array.isArray(profile.skills) ||
    profile.skills.length === 0
  ) {
    return 'At least one skill is required.';
  }

  if (
    profile.otherSkills &&
    (typeof profile.otherSkills !== 'string' || profile.otherSkills.length > 100)
  ) {
    return 'Other skills must be less than 100 characters.';
  }

  if (
    profile.preferences &&
    (typeof profile.preferences !== 'string' || profile.preferences.length > 500)
  ) {
    return 'Preferences must be less than 500 characters.';
  }

  if (
    !Array.isArray(profile.availability) ||
    profile.availability.length === 0
  ) {
    return 'At least one availability date is required.';
  }

  if (
    !profile.username ||
    typeof profile.username !== 'string' ||
    profile.username.length < 3
  ) {
    return 'Username is required, must be a string and at least 3 characters.';
  }

  return null; // No validation errors
}

// Create new profile
router.post('/', (req, res) => {
  const profile = req.body;

  // Check for unique username
  if (userProfiles.some(p => p.username === profile.username)) {
    return res.status(400).json({ error: 'Username already exists.' });
  }

  const error = validateUserProfile(profile);
  if (error) {
    return res.status(400).json({ error });
  }

  userProfiles.push(profile);
  res.status(201).json({ message: 'User profile saved successfully', profile });
});

// Get all profiles
router.get('/', (req, res) => {
  res.json(userProfiles);
});

// Update profile by username
router.put('/:username', (req, res) => {
  const { username } = req.params;
  const updatedProfile = req.body;

  const index = userProfiles.findIndex(p => p.username === username);
  if (index === -1) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  // If username is changed, check for conflicts
  if (updatedProfile.username && updatedProfile.username !== username) {
    if (userProfiles.some(p => p.username === updatedProfile.username)) {
      return res.status(400).json({ error: 'New username already exists.' });
    }
  }

  // Merge current profile with updates
  const mergedProfile = { ...userProfiles[index], ...updatedProfile };

  const error = validateUserProfile(mergedProfile);
  if (error) {
    return res.status(400).json({ error });
  }

  userProfiles[index] = mergedProfile;
  res.json({ message: 'Profile updated', profile: userProfiles[index] });
});

// Delete profile by username
router.delete('/:username', (req, res) => {
  const { username } = req.params;

  const index = userProfiles.findIndex(p => p.username === username);
  if (index === -1) {
    return res.status(404).json({ error: 'Profile not found' });
  }

  const removed = userProfiles.splice(index, 1);
  res.json({ message: 'Profile deleted', profile: removed[0] });
});

module.exports = router;

