const { validateEvent } = require("../validation/eventValidation");

let fakeEventsDB = [];

exports.createEvent = (req, res) => {
  const { isValid, errors } = validateEvent(req.body);

  if (!isValid) {
    return res.status(400).json({ errors });
  }

  const newEvent = {
    id: fakeEventsDB.length + 1,
    ...req.body,
  };

  fakeEventsDB.push(newEvent);

  res.status(201).json({ message: "Event created successfully!", event: newEvent });
};
