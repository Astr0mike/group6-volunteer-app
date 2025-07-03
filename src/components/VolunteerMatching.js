import React, {useState} from 'react';
import '../css/VolunteerMatching.css'

// placeholder data, for now
const mockVolunteers = [
    { id: 1, name: 'Jane Doe', skill: 'First Aid', distance: 10 },
    { id: 2, name: 'John Smith', skill: 'Teaching', distance: 5 },
];

const VolunteerMatching = () => {
    // function that sets the initial state of the filters to blank
    const [filters, setFilters] = useState({
        skill: '',
        distance: '',
        type: '',
    });
    const [selectedVolunteers, setSelectedVolunteers] = useState([]);

    // function to handle checkboxes
    const handleCheckboxChange = (id) => {
        setSelectedVolunteers((prev) =>
            prev.includes(id)
                ? prev.filter((volunteerId) => volunteerId !== id)
                : [...prev, id]
        );
    };

    // Alerts admin that they have notified selected volunteer(s)
    const handleNotify = () => {
        const names = mockVolunteers
            .filter((volunteer) => selectedVolunteers.includes(volunteer.id))
            .map((volunteer) => volunteer.name);
        alert(`You have been notified of ${names.join(', ')}`);
    };

    // function to handle changing the filters
    const handleChange = (e) => {
        setFilters({
            ...filters,
            [e.target.name]: e.target.value,
        });
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
                    Distance (mi):
                    <input type="number" name="distance" value={filters.distance} onChange={handleChange} />
                </label>
                <label className="filter">
                    Type:
                    <select name="type" value={filters.type} onChange={handleChange}>
                        <option value="">Any</option>
                        <option value="environmental">Environmental</option>
                        <option value="education">Education</option>
                        <option value="healthcare">Healthcare</option>
                    </select>
                </label>
            </div>

            <div className="matching-results">
                <div className="volunteer-list">
                    <h3>Potential Volunteers</h3>
                    <ul>
                        {/* to be replaced with data from a database */ mockVolunteers.map((volunteer) => (
                            <il key={volunteer.id}>
                                <label>
                                    <input
                                        type="checkbox"
                                        checked={selectedVolunteers.includes(volunteer.id)}
                                        onChange={() => handleCheckboxChange(volunteer.id)}
                                    />
                                    {` ${volunteer.name} - ${volunteer.skill}, ${volunteer.distance} mi`}
                                </label>
                            </il>
                            ))}
                    </ul>
                </div>

                <div className="opportunity-list">
                    <h3>Matching Opportunities</h3>
                    {/* to be replaced with data from a database */}
                    <ul>
                        <li>Local Shelter — Needs First Aid</li>
                        <li>Community Center — Needs Teaching</li>
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
