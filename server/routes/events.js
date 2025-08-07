const express = require("express");
const router = express.Router();
const { createEvent, getAllEvents, deleteEvent, updateEvent } = require('../controllers/eventsController');

router.post("/", createEvent);
router.get("/", getAllEvents);
router.delete("/:id", deleteEvent);
router.put("/:id", updateEvent); 

module.exports = router;
