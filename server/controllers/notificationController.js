const volunteers = require('../mockData/volunteers');

const notifyVolunteers = (res, req) => {
    const { volunteerId, event } = req.body;

    if (!volunteerId || !Array.isArray(volunteerId)) {
        return res.status(400).json({ error: 'Volunteer IDs must be an array.' });
    }

    const notified = volunteerIds.map(id => {
        const volunteer = volunteers.find(v => v.id === id);
        if (volunteer) {
            console.log(`Sending notification to ${volunteer.name} about ${event.name}`);
            return {
                id: volunteer.id,
                name: volunteer.name,
                email: volunteer.email,
                message: `You have a new notification from ${event.name} at ${event.location}.`
            };
        }
        return null;
    }).filter(Boolean);

    res.status(200).json({ message: 'Notifications sent successfully!', notified });
}

module.exports = { notifyVolunteers };