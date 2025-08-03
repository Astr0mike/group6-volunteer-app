const db = require('../pool');

const matchVolunteers = async (req, res) => {
    const { skill, distance, type } = req.query;

    try {
        // Fetch all volunteers
        const [volunteers] = await db.query(`
            SELECT id, full_name, skills, address1, city, state, zip
            FROM userProfile
        `);

        // Fetch all events
        const [events] = await db.query(`
            SELECT id, eventName, location, requiredSkills, urgency, eventDate
            FROM eventDetails
        `);

        const matchedVolunteers = volunteers.filter(volunteer => {
            let skillArray = [];

            try {
                if (Array.isArray(volunteer.skills)) {
                    skillArray = volunteer.skills.map(s => s.toLowerCase());
                }
            } catch (err) {
                console.warn(`Unexpected skills format for volunteer ID ${volunteer.id}:`, volunteer.skills);
                return false;
            }

            const matchesSkill = !skill || skillArray.some(s =>
                s.includes(skill.toLowerCase())
            );

            const matchesDistance = !distance || parseInt(distance) >= 10; // placeholder for real distance

            const matchesType = !type || events.some(event => {
                const required = (event.requiredSkills || '')
                    .split(',')
                    .map(s => s.trim().toLowerCase());

                return required.some(r => skillArray.includes(r));
            });

            return matchesSkill && matchesDistance && matchesType;
        });

        const matchedEvents = events.filter(event => {
            const required = (event.requiredSkills || '')
                .split(',')
                .map(s => s.trim().toLowerCase());

            const matchesType = !type || event.eventName.toLowerCase().includes(type.toLowerCase());
            const matchesSkill = !skill || required.some(s => s.includes(skill.toLowerCase()));

            return matchesType && matchesSkill;
        });

        const formattedVolunteers = matchedVolunteers.map(v => {
            let parsedSkills = [];

            try {
                const raw = v.skills;

                if (Array.isArray(raw)) {
                    parsedSkills = raw;
                } else if (typeof raw === 'string') {
                    let cleaned = raw;
                    if (cleaned.startsWith("'") && cleaned.endsWith("'")) {
                        cleaned = cleaned.slice(1, -1);
                    }
                    parsedSkills = JSON.parse(cleaned);
                }
            } catch (err) {
                console.warn(`Could not format skills for volunteer ID ${v.id}:`, v.skills);
            }

            return {
                id: v.id,
                name: v.full_name,
                skills: parsedSkills.join(', '),
                distance: 10 // placeholder
            };
        });

        const formattedEvents = matchedEvents.map(e => ({
            id: e.id,
            name: e.eventName,
            location: e.location,
            urgency: e.urgency,
            date: e.eventDate,
            distance: 5 // placeholder
        }));

        res.status(200).json({ volunteers: formattedVolunteers, events: formattedEvents });
    } catch (err) {
        console.error('Error matching volunteers:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = { matchVolunteers };