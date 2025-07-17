const volunteers = require('../mockData/volunteers');
const events = require('../mockData/events');

const matchVolunteers = (req, res) => {
    const { skill, distance, type } = req.query;

    const matchedVolunteers = volunteers.filter(volunteer => {
        const skills = Array.isArray(volunteer.skills) ? volunteer.skills.map(s => s.toLowerCase()) : [];
        const matchedSkills = !skill || skills.includes(s => s.includes(skill.toLowerCase()));
        const matchedDistance = !distance || volunteer.distance <= parseInt(distance);
        const matchedType = !type || events.some(
            e => e.type === type && (!e.skillRequired || skills.includes(s => s.includes(
                e.skillRequired.toLowerCase()))));
        return matchedSkills && matchedDistance && matchedType;
    });

    const matchedEvents = events.filter(e => {
        return (!type || e.type === type) &&
            (!skill || e.skillRequired.toLowerCase().includes(skill.toLowerCase()));
    });
    res.status(200).json({ volunteers: matchedVolunteers, events: matchedEvents });
};

module.exports = { matchVolunteers };