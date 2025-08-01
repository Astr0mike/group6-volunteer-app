const db = require('../pool');

exports.getVolunteerHistory = async (req, res) => {
    try {
        const [rows] = await db.query(`
      SELECT 
        u.full_name AS name,
        'Active' AS status, -- Or compute dynamically if needed
        e.eventName AS organization,
        vh.role,
        e.eventDate AS date,
        vh.hours_worked AS hours
      FROM VolunteerHistory vh
      JOIN UserProfile u ON vh.user_id = u.id
      JOIN EventDetails e ON vh.event_id = e.id
      ORDER BY u.full_name, e.eventDate DESC
    `);

        // Group history by user
        const users = {};
        rows.forEach(row => {
            if (!users[row.name]) {
                users[row.name] = {
                    name: row.name,
                    status: row.status,
                    history: [],
                };
            }
            users[row.name].history.push({
                organization: row.organization,
                role: row.role,
                date: row.date,
                hours: row.hours,
            });
        });

        res.status(200).json(Object.values(users)); // Send an array of users with their histories
    } catch (err) {
        console.error('Error fetching volunteer history:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
};
