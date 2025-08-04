import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

function EventManagementForm() {
  const [formData, setFormData] = useState({
    eventName: "",
    eventDescription: "",
    location: "",
    requiredSkills: [],
    urgency: "",
    eventDate: "",
  });

  const [errors, setErrors] = useState({});
  const [skillsDropdownOpen, setSkillsDropdownOpen] = useState(false);
  const [events, setEvents] = useState([]);

  const skillsOptions = [
    "Leadership",
    "Communication",
    "Planning",
    "Technical",
    "Management",
    "Problem Solving",
    "Teamwork",
  ];
  const urgencyOptions = ["Low", "Medium", "High", "Critical"];
  const todayDate = new Date().toISOString().split("T")[0];

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = () => {
    fetch('http://localhost:3001/api/events')
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Failed to load events:", err));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({
        ...formData,
        requiredSkills: [...formData.requiredSkills, value],
      });
    } else {
      setFormData({
        ...formData,
        requiredSkills: formData.requiredSkills.filter((skill) => skill !== value),
      });
    }
  };

  const toggleDropdown = () => {
    setSkillsDropdownOpen(!skillsDropdownOpen);
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.eventName.trim()) {
      newErrors.eventName = "Event Name is required";
    } else if (formData.eventName.length > 100) {
      newErrors.eventName = "Event Name cannot exceed 100 characters";
    }

    if (!formData.eventDescription.trim()) {
      newErrors.eventDescription = "Event Description is required";
    }

    if (!formData.location.trim()) {
      newErrors.location = "Location is required";
    }

    if (formData.requiredSkills.length === 0) {
      newErrors.requiredSkills = "Please select at least one skill";
    }

    if (!formData.urgency) {
      newErrors.urgency = "Please select urgency level";
    }

    if (!formData.eventDate) {
      newErrors.eventDate = "Please pick a date for the event";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch('http://localhost:3001/api/events', {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors(data.errors || {});
      } else {
        alert(data.message || "Event Created Successfully!");
        setFormData({
          eventName: "",
          eventDescription: "",
          location: "",
          requiredSkills: [],
          urgency: "",
          eventDate: "",
        });
        setSkillsDropdownOpen(false);
        fetchEvents();
      }
    } catch (error) {
      console.error("Error submitting event:", error);
      alert("An error occurred while creating the event. Please try again.");
    }
  };

  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Event Report", 14, 20);

    const tableColumn = [
      "Event Name",
      "Description",
      "Location",
      "Skills",
      "Urgency",
      "Date",
    ];
    const tableRows = [];

    events.forEach((event) => {
      const eventData = [
        event.eventName,
        event.eventDescription,
        event.location,
        Array.isArray(event.requiredSkills)
          ? event.requiredSkills.join(", ")
          : event.requiredSkills,
        event.urgency,
        new Date(event.eventDate).toLocaleDateString(),
      ];
      tableRows.push(eventData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      styles: {
        fontSize: 10,
        overflow: "linebreak",
        cellPadding: 2,
      },
      columnStyles: {
        0: { cellWidth: 30 },
        1: { cellWidth: 45 },
        2: { cellWidth: 30 },
        3: { cellWidth: 35 },
        4: { cellWidth: 20 },
        5: { cellWidth: 25 },
      },
    });

    doc.save("event_report.pdf");
  };

  return (
    <div>
      <h2>Event Management Form</h2>

      <form onSubmit={handleSubmit}>
        {/* Event Name */}
        <div>
          <label htmlFor="eventName">
            Event Name <span>*</span>
          </label>
          <input
            type="text"
            id="eventName"
            name="eventName"
            maxLength="100"
            value={formData.eventName}
            onChange={handleChange}
          />
          {errors.eventName && <p>{errors.eventName}</p>}
        </div>

        {/* Event Description */}
        <div>
          <label htmlFor="eventDescription">
            Event Description <span>*</span>
          </label>
          <textarea
            id="eventDescription"
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            rows="4"
          ></textarea>
          {errors.eventDescription && <p>{errors.eventDescription}</p>}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location">
            Location <span>*</span>
          </label>
          <textarea
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            rows="2"
          ></textarea>
          {errors.location && <p>{errors.location}</p>}
        </div>

        {/* Required Skills */}
        <div>
          <label>
            Required Skills <span>*</span> (Select all that apply)
          </label>
          <button type="button" onClick={toggleDropdown}>
            {formData.requiredSkills.length > 0
              ? `Selected: ${formData.requiredSkills.join(", ")}`
              : "Select Skills"}{" "}
            <span>{skillsDropdownOpen ? "▲" : "▼"}</span>
          </button>
          {skillsDropdownOpen && (
            <div>
              {skillsOptions.map((skill) => (
                <label key={skill}>
                  <input
                    type="checkbox"
                    value={skill}
                    checked={formData.requiredSkills.includes(skill)}
                    onChange={handleCheckboxChange}
                  />
                  {skill}
                </label>
              ))}
            </div>
          )}
          {errors.requiredSkills && <p>{errors.requiredSkills}</p>}
        </div>

        {/* Urgency */}
        <div>
          <label htmlFor="urgency">
            Urgency <span>*</span>
          </label>
          <select
            id="urgency"
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
          >
            <option value="">-- Select Urgency --</option>
            {urgencyOptions.map((urgency) => (
              <option key={urgency} value={urgency}>
                {urgency}
              </option>
            ))}
          </select>
          {errors.urgency && <p>{errors.urgency}</p>}
        </div>

        {/* Event Date */}
        <div>
          <label htmlFor="eventDate">
            Event Date <span>*</span>
          </label>
          <input
            type="date"
            id="eventDate"
            name="eventDate"
            min={todayDate}
            value={formData.eventDate}
            onChange={handleChange}
          />
          {errors.eventDate && <p>{errors.eventDate}</p>}
        </div>

        {/* Submit Button */}
        <button type="submit">Create Event</button>
      </form>

      <hr />

      {events.length > 0 && (
        <button onClick={handleDownloadPDF}>Download Event Report (PDF)</button>
      )}

      <div>
        <h3>Submitted Events</h3>
        {events.length === 0 ? (
          <p>No events submitted yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Location</th>
                <th>Skills</th>
                <th>Urgency</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event.id}>
                  <td>{event.eventName}</td>
                  <td>{event.eventDescription}</td>
                  <td>{event.location}</td>
                  <td>
                    {Array.isArray(event.requiredSkills)
                      ? event.requiredSkills.join(", ")
                      : event.requiredSkills}
                  </td>
                  <td>{event.urgency}</td>
                  <td>{new Date(event.eventDate).toLocaleDateString()}</td>
                  <td>
                    {/* Delete button removed */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default EventManagementForm;
