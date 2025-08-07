import React, {useEffect, useState} from 'react';
import '../css/VolunteerMatching.css'
import axios from 'axios';


const VolunteerMatching = () => {
    // function that sets the initial state of the filters to blank
    const [filters, setFilters] = useState({
        skill: '',
        name: '',
        urgency: '',
    });
    const [volunteers, setVolunteers] = useState([]);
    const [events, setEvents] = useState([]);
    const [selectedVolunteers, setSelectedVolunteers] = useState([]);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                const res = await axios.get('http://localhost:3001/api/volunteer-matching/match', {
                    params: filters,
                });
                console.log(res.data);
                setVolunteers(res.data.volunteers);
                setEvents(res.data.events);
            } catch (err) {
                console.error('Error fetching matches:', err);
            }
        };

        fetchMatches();
    }, [filters]);

    // function to handle changing the filters
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
    };

    // function to handle checkboxes
    const handleCheckboxChange = (id) => {
        setSelectedVolunteers((prev) =>
            prev.includes(id)
                ? prev.filter((volunteerId) => volunteerId !== id)
                : [...prev, id]
        );
    };

    // Alerts admin that they have notified selected volunteer(s)
    const handleNotify = async () => {
        try {
            const res = await axios.post('http://localhost:3001/api/volunteer-matching/notify', {
                volunteerIds: selectedVolunteers
            });
            const names = res.data.notified.map(n => n.volunteer);
            alert(`You have notified ${names.join(', ')}`);
        } catch (err) {
            console.error('Error notifying volunteers:', err);
            alert('An error occurred while notifying the volunteers. Please try again.');
        }
    };

    return (
        <div className="volunteer-matching">
            <h1>Match volunteers with current opportunities</h1>
            <div className="matching-filters">
                <h2>Filters:</h2>
                <label className="filter">
                    Skill:
                    <input type="text" name="skill" value={filters.skill} onChange={handleChange} />
                </label>
                <label className="filter">
                    Name:
                    <input type="text" name="name" value={filters.name} onChange={handleChange} />
                </label>
                <label className="filter">
                    Event Urgency:
                    <select name="urgency" value={filters.urgency} onChange={handleChange}>
                        <option value="">All</option>
                        <option value="Low">Low</option>
                        <option value="Medium">Medium</option>
                        <option value="High">High</option>
                        <option value="Critical">Critical</option>
                    </select>
                </label>
            </div>

            <div className="matching-results">
                <div className="volunteer-list">
                    <h3>Potential Volunteers</h3>
                    <ul>
                        {volunteers.length === 0 && <li>No volunteers found.</li>}
                        {volunteers.map((volunteer) => (
                            <li key={volunteer.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedVolunteers.includes(volunteer.id)}
                                        onChange={() => handleCheckboxChange(volunteer.id)}
                                    />
                                    <span>{` ${volunteer.name} - ${volunteer.skills}`}</span>
                                </label>
                            </li>
                            ))}
                    </ul>
                </div>

                <div className="opportunity-list">
                    <h3>Matching Opportunities</h3>
                    <ul>
                        {events.length === 0 && <li>No opportunities found.</li>}
                        {events.map((event) => (
                            <li key={event.id}>
                                {`Event ID ${event.id}: ${event.name} - ${event.location}, 
                                ${event.urgency}`}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            <div className="notify-section">
                <button
                    className="notify-btn"
                    disabled={selectedVolunteers.length === 0}
                    onClick={handleNotify}
                >
                    Notify Selected Volunteers
                </button>
            </div>
        </div>
    );
};

export default VolunteerMatching;
