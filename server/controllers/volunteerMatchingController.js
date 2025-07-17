const volunteers = require('../mockData/volunteers');
const events = require('../mockData/events');

const matchVolunteers = (req, res) => {
    const { skill, distance, type } = req.query;

    const matchedVolunteers = volunteers.filter(volunteer => {
        const skills = Array.isArray(volunteer.skills) ? volunteer.skills.map(s => s.toLowerCase()) : [];

        const matchedSkills = !skill || skills.some(s => s.includes(skill.toLowerCase()));

        const matchedDistance = !distance || volunteer.distance <= parseInt(distance);

        const matchedType = !type || events.some(e => {
            if (e.type.toLowerCase() === type.toLowerCase()) return false;

            if (!e.skillRequired) return true;

            const eventSkills = Array.isArray(e.skillRequired)
                ? e.skillRequired.map(s => s.toLowerCase())
                : [e.skillRequired.toLowerCase()];

            return eventSkills.some(req => skills.includes(req));
        });

        return matchedSkills && matchedDistance && matchedType;
    });

    const matchedEvents = events.filter(e => {
        const matchesType = !type || e.type.toLowerCase() === type.toLowerCase();

        const matchesSkill = !skill || !e.skillRequired ||
            (Array.isArray(e.skillRequired)
                ? e.skillRequired.some(req => req.toLowerCase().includes(skill.toLowerCase()))
                : e.skillRequired.toLowerCase().includes(skill.toLowerCase()));

        return matchesType && matchesSkill;
    });
    res.status(200).json({ volunteers: matchedVolunteers, events: matchedEvents });
};

module.exports = { matchVolunteers };