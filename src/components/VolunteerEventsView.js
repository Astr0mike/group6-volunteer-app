import React, { useEffect, useState } from 'react';

function VolunteerEventsView() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3001/api/events')
      .then(res => res.json())
      .then(data => setEvents(data))
      .catch(err => console.error('Error fetching events:', err));
  }, []);

  return (
    <div>
      <h2>Available Events</h2>
      {events.length === 0 ? (
        <p>No events available at the moment.</p>
      ) : (
        <table border="1" cellPadding="5" style={{ borderCollapse: 'collapse', width: '100%' }}>
          <thead>
            <tr>
              <th>Event Name</th>
              <th>Description</th>
              <th>Location</th>
              <th>Skills Required</th>
              <th>Urgency</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id}>
                <td>{event.eventName}</td>
                <td>{event.eventDescription}</td>
                <td>{event.location}</td>
                <td>{Array.isArray(event.requiredSkills) ? event.requiredSkills.join(', ') : event.requiredSkills}</td>
                <td>{event.urgency}</td>
                <td>{new Date(event.eventDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default VolunteerEventsView;
