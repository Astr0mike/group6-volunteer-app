const volunteers = require('../mockData/volunteers');
const events = require('../mockData/events');

const notifyVolunteers = (res, req) => {
    const { volunteerIds } = req.body;

    if (!Array.isArray(volunteerIds)) {
        return res.status(400).json({ error: 'Volunteer IDs must be an array.' });
    }

    const notified = volunteerIds.map(id => {
        const volunteer = volunteers.find(v => v.id === id);
        if (!volunteer) return null;

        const matchedEvents = events.filter(e =>
            !e.skillRequired || e.skillRequired.some(req => volunteer.skills.includes(req))
        );

        console.log(`Notified ${ volunteer.name} about events: ${matchedEvents.map(e => e.eventName).join(', ')}`);

        return {
            volunteer: volunteer.name,
            events: matchedEvents.map(e => e.eventName)
        };
    }).filter(Boolean);

    res.status(200).json({ message: 'Notifications sent successfully!', notified });
}

module.exports = { notifyVolunteers };