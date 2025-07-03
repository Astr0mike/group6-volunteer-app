import React, { useState } from "react";
import '../css/EventManagementForm.css'

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

  const skillsOptions = ["Leadership", "Communication", "Planning", "Technical", "Management"];
  const urgencyOptions = ["Low", "Medium", "High", "Critical"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleMultiSelectChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setFormData({ ...formData, requiredSkills: selected });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.eventName.trim()) newErrors.eventName = "Event Name is required";
    if (formData.eventName.length > 100) newErrors.eventName = "Max 100 characters";
    if (!formData.eventDescription.trim()) newErrors.eventDescription = "Description is required";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    if (formData.requiredSkills.length === 0) newErrors.requiredSkills = "Select at least one skill";
    if (!formData.urgency) newErrors.urgency = "Select urgency";
    if (!formData.eventDate) {
      newErrors.eventDate = "Pick a date";
    } else {
      const today = new Date();
      const selectedDate = new Date(formData.eventDate);
      if (selectedDate < today.setHours(0, 0, 0, 0)) {
      }
    }
    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      alert("Event Created Successfully!");
    }
  };

  const todayDate = new Date().toISOString().split("T")[0];

  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
      <div>
        <h2>Event Management Form</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>Event Name *</label>
            <input
              type="text"
              name="eventName"
              maxLength="100"
              value={formData.eventName}
              onChange={handleChange}
            />
            {errors.eventName && <p>{errors.eventName}</p>}
          </div>

          <div>
            <label>Event Description *</label>
            <textarea
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
            ></textarea>
            {errors.eventDescription && <p>{errors.eventDescription}</p>}
          </div>

          <div>
            <label>Location *</label>
            <textarea
              name="location"
              value={formData.location}
              onChange={handleChange}
            ></textarea>
            {errors.location && <p>{errors.location}</p>}
          </div>

          <div>
            <label>Required Skills *</label>
            <select
              multiple
              value={formData.requiredSkills}
              onChange={handleMultiSelectChange}
            >
              {skillsOptions.map((skill) => (
                <option key={skill} value={skill}>
                  {skill}
                </option>
              ))}
            </select>
            {errors.requiredSkills && <p>{errors.requiredSkills}</p>}
          </div>

          <div>
            <label>Urgency *</label>
            <select
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

          <div>
            <label>Event Date *</label>
            <input
              type="date"
              name="eventDate"
              min={todayDate}
              value={formData.eventDate}
              onChange={handleChange}
            />
            {errors.eventDate && <p>{errors.eventDate}</p>}
          </div>

          <button type="submit">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventManagementForm;
