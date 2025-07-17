const express = require('express');
const router = express.Router();
const { notifyVolunteers } = require('../controllers/notificationController');

router.post('/notify', notifyVolunteers);

module.exports = router;