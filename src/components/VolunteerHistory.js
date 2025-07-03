import React from 'react';
import '../css/VolunteerHistory.css'

const VolunteerHistory = () => {
    const volunteer = {
        name: "Jane Doe",
        status: "Active",
        history: [
            {
                organization: "Red Cross",
                role: "Disaster Relief",
                date: "2021-01-01",
                hours: 4,
            },
            {
                organization: "Houston Animal Shelter",
                role: "Animal Care",
                date: "2021-01-01",
                hours: 3,
            },
        ],
    };

    return ( // HTML for webpage
        <div className="volunteer-history">
            <h1>Volunteer History</h1>
            <div className="volunteer-info">
                <p><strong>Volunteer:</strong> {volunteer.name}</p>
                <p>
                    <strong>Status:</strong> {' '}
                    <span className={`status ${volunteer.status.toLowerCase()}`}>
                        {volunteer.status}
                    </span>
                </p>
            </div>

            <div className="work-history">
                <h2>Work History</h2>
                {volunteer.history.map((job, index) => (
                    <div key={index} className="history-entry">
                        <p><strong>Organization:</strong> {job.organization}</p>
                        <p><strong>Role:</strong> {job.role}</p>
                        <p><strong>Date:</strong> {job.date}</p>
                        <p><strong>Hours:</strong> {job.hours}</p>
                    </div>
                    ))}
            </div>
        </div>
    );
};

export default VolunteerHistory;