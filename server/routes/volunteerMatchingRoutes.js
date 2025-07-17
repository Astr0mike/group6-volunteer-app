const express = require('express');
const router = express.Router();
const volunteerMatchingController = require('../controllers/volunteerMatchingController');

router.get('/match', volunteerMatchingController.matchVolunteers);

module.exports = router;