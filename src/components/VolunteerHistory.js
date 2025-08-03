import React, { useEffect, useState } from 'react';
import '../css/VolunteerHistory.css';

import jsPDF from 'jspdf';
import 'jspdf-autotable';

const VolunteerHistory = () => {
    const [volunteers, setVolunteers] = useState([]);
    const [nameFilter, setNameFilter] = useState('');
    const [eventFilter, setEventFilter] = useState('');

    useEffect(() => {
        fetch('http://localhost:3001/api/volunteer-history')
            .then((res) => res.json())
            .then((data) => setVolunteers(data))
            .catch((err) => console.error('Error fetching data:', err));
    }, []);

    const filterVolunteers = volunteers
        .filter(volunteer => volunteer.name.toLowerCase().includes(nameFilter.toLowerCase()))
        .map(volunteer => ({
            ...volunteer,
            history: volunteer.history.filter(job =>
                job.organization.toLowerCase().includes(eventFilter.toLowerCase())
            ),
        }))
        .filter(volunteer => volunteer.history.length > 0);

    const exportToPDF = () => {
        const doc = new jsPDF();
        const pageWidth = doc.internal.pageSize.width;
        let y = 20;

        doc.setFontSize(18);
        doc.text('Volunteer History Report', 14, y);

        volunteers.forEach(volunteer => {
            y += 15;
            if (y >= doc.internal.pageSize.height - 20) {
                doc.addPage();
                y = 20;
            }

            doc.setFontSize(14);
            doc.text(`Name: ${volunteer.name} (${volunteer.status})`, 14, y);

            y += 10;
            doc.setFontSize(10);

            // Draw table headers
            const columns = ['Organization', 'Role', 'Date', 'Hours'];
            const colWidth = (pageWidth - 28) / columns.length;

            columns.forEach((col, i) => {
                doc.text(col, 14 + (i * colWidth), y);
            });

            y += 5;
            doc.line(14, y, pageWidth - 14, y);

            // Draw table rows
            volunteer.history.forEach(job => {
                y += 10;
                if (y >= doc.internal.pageSize.height - 20) {
                    doc.addPage();
                    y = 20;
                }

                doc.text(job.organization, 14, y);
                doc.text(job.role, 14 + colWidth, y);
                doc.text(new Date(job.date).toLocaleDateString(), 14 + (2 * colWidth), y);
                doc.text(job.hours.toString(), 14 + (3 * colWidth), y);
            });

            y += 10;
        });

        doc.save('volunteer-history.pdf');
    };


    if (!volunteers.length) return <div>Loading...</div>;

    return (
        <div className="volunteer-history">
            <h1>Volunteer History</h1>
            <div className="filters">
                <input
                    type="text"
                    placeholder="Filter by name"
                    value={nameFilter}
                    onChange={e => setNameFilter(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Filter by event/organization"
                    value={eventFilter}
                    onChange={e => setEventFilter(e.target.value)}
                />
                <button onClick={exportToPDF}>Export to PDF</button>
            </div>

            {filterVolunteers.map((volunteer, idx) => (
                <div key={idx} className="volunteer-info">
                    <h2>{volunteer.name}</h2>
                    <p>
                        <strong>Status:</strong>{' '}
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
