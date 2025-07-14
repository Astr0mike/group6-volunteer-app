const express = require('express');
const router = express.Router();
const volunteerHistoryController = require('../controllers/volunteerHistoryController');

router.get('/', volunteerHistoryController.getVolunteerHistory);

module.exports = router;