// backend/routes/userProfileRoutes.js
const express = require('express');
const router = express.Router();

// @ts-ignore: ignore filename casing mismatch for this import
const {
  createUserProfile,
  getAllUserProfiles,
  getUserProfileById,
  updateUserProfile,
  deleteUserProfile
} = require('../controllers/userProfileController');

// Create a new profile
router.post('/', createUserProfile);

// Get all profiles
router.get('/', getAllUserProfiles);

// Get a single profile by ID
router.get('/:id', getUserProfileById);

// Update a profile by ID
router.put('/:id', updateUserProfile);

// Delete a profile by ID
router.delete('/:id', deleteUserProfile);

module.exports = router;
