import React, {useEffect, useState} from 'react';
import '../css/VolunteerHistory.css'

const VolunteerHistory = () => {
    const [volunteers, setVolunteers] = useState([]);

    useEffect(() => {
        fetch('http://localhost:3001/api/volunteer-history')
        .then((res) => res.json())
        .then((data) => setVolunteers(data))
        .catch((err) => console.error('Error fetching data:', err));
        }, []);

    if (!volunteers.length) return <div>Loading...</div>;

    return ( // HTML for webpage
        <div className="volunteer-history">
            <h1>Volunteer History</h1>
            {volunteers.map((volunteer, idx) => (
                <div key={idx} className="volunteer-info">
                    <h2>{volunteer.name}</h2>
                    <p>
                        <strong>Status:</strong> {' '}
                        <span className={`status ${volunteer.status.toLowerCase()}`}>
                            {volunteer.status}
                        </span>
                    </p>

                    <div className="work-history">
                        {volunteer.history.map((job, index) => (
                            <div key={index} className="history-entry">
                                <p><strong>Organization:</strong> {job.organization}</p>
                                <p><strong>Role:</strong> {job.role}</p>
                                <p><strong>Date:</strong> {new Date(job.date).toLocaleDateString()}</p>
                                <p><strong>Hours:</strong> {job.hours}</p>
                            </div>
                        ))}
                    </div>
                    <hr />
                </div>
            ))}
        </div>
    );
};

export default VolunteerHistory;