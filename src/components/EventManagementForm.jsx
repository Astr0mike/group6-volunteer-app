
import React, { useState } from "react";
import "../css/EventManagementForm.css";
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      console.log("Form submitted:", formData);
      alert("Event Created Successfully!");
      setFormData({
        eventName: "",
        eventDescription: "",
        location: "",
        requiredSkills: [],
        urgency: "",
        eventDate: "",
      });
      setSkillsDropdownOpen(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Event Management Form</h2>

        <form onSubmit={handleSubmit}>
          {/* Event Name */}
          <div className="form-group">
            <label htmlFor="eventName" className="form-label">
              Event Name <span className="required-star">*</span>
            </label>
            <input
              type="text"
              id="eventName"
              name="eventName"
              maxLength="100"
              value={formData.eventName}
              onChange={handleChange}
              className="form-input"
            />
            {errors.eventName && <p className="error-message">{errors.eventName}</p>}
          </div>

          {/* Event Description */}
          <div className="form-group">
            <label htmlFor="eventDescription" className="form-label">
              Event Description <span className="required-star">*</span>
            </label>
            <textarea
              id="eventDescription"
              name="eventDescription"
              value={formData.eventDescription}
              onChange={handleChange}
              rows="4"
              className="form-textarea"
            ></textarea>
            {errors.eventDescription && <p className="error-message">{errors.eventDescription}</p>}
          </div>

          {/* Location */}
          <div className="form-group">
            <label htmlFor="location" className="form-label">
              Location <span className="required-star">*</span>
            </label>
            <textarea
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              rows="2"
              className="form-textarea"
            ></textarea>
            {errors.location && <p className="error-message">{errors.location}</p>}
          </div>

          {/* Required Skills */}
          <div className="form-group skills-dropdown-container">
            <label className="form-label">
              Required Skills <span className="required-star">*</span> (Select all that apply)
            </label>
            <button
              type="button"
              onClick={toggleDropdown}
              className="skills-dropdown-button"
            >
              {formData.requiredSkills.length > 0
                ? `Selected: ${formData.requiredSkills.join(", ")}`
                : "Select Skills"}
              <span className="dropdown-arrow">{skillsDropdownOpen ? "▲" : "▼"}</span>
            </button>
            {skillsDropdownOpen && (
              <div className="skills-dropdown-list">
                {skillsOptions.map((skill) => (
                  <label key={skill} className="skills-checkbox-label">
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
            {errors.requiredSkills && <p className="error-message">{errors.requiredSkills}</p>}
          </div>

          {/* Urgency */}
          <div className="form-group">
            <label htmlFor="urgency" className="form-label">
              Urgency <span className="required-star">*</span>
            </label>
            <select
              id="urgency"
              name="urgency"
              value={formData.urgency}
              onChange={handleChange}
              className="form-select"
            >
              <option value="">-- Select Urgency --</option>
              {urgencyOptions.map((urgency) => (
                <option key={urgency} value={urgency}>
                  {urgency}
                </option>
              ))}
            </select>
            {errors.urgency && <p className="error-message">{errors.urgency}</p>}
          </div>

          {/* Event Date */}
          <div className="form-group">
            <label htmlFor="eventDate" className="form-label">
              Event Date <span className="required-star">*</span>
            </label>
            <input
              type="date"
              id="eventDate"
              name="eventDate"
              min={todayDate}
              value={formData.eventDate}
              onChange={handleChange}
              className="form-input"
            />
            {errors.eventDate && <p className="error-message">{errors.eventDate}</p>}
          </div>

          {/* Submit Button */}
          <button type="submit" className="submit-button">
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
}

export default EventManagementForm;
