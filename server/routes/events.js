const express = require("express");
const router = express.Router();
const { createEvent } = require("../controllers/eventsController");

// POST /api/events
router.post("/", createEvent);

module.exports = router;

