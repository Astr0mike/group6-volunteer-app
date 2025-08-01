const db = require('../pool');
const { validateEvent } = require("../validation/eventValidation");

exports.createEvent = async (req, res) => {
  const { isValid, errors } = validateEvent(req.body);
  if (!isValid) return res.status(400).json({ errors });

  const { eventName, eventDescription, location, requiredSkills, urgency, eventDate } = req.body;

  try {
    await db.query(
      "INSERT INTO EventDetails (eventName, eventDescription, location, requiredSkills, urgency, eventDate) VALUES (?, ?, ?, ?, ?, ?)",
      [eventName, eventDescription, location, requiredSkills.join(","), urgency, eventDate]
    );

    res.status(201).json({ message: "Event created successfully." });
  } catch (error) {
    console.error("DB Error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllEvents = async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM EventDetails");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
