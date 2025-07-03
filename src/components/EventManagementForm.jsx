import React, { useState } from "react";
import '../css/EventManagementForm.css'

export default function EventManagementForm() {
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
    if (!formData.eventDate) newErrors.eventDate = "Pick a date";
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

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow rounded">
      <h2 className="text-2xl font-bold mb-4">Event Management Form</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block font-medium">Event Name *</label>
          <input
            type="text"
            name="eventName"
            maxLength="100"
            value={formData.eventName}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.eventName && <p className="text-red-500 text-sm">{errors.eventName}</p>}
        </div>

        <div>
          <label className="block font-medium">Event Description *</label>
          <textarea
            name="eventDescription"
            value={formData.eventDescription}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.eventDescription && <p className="text-red-500 text-sm">{errors.eventDescription}</p>}
        </div>

        <div>
          <label className="block font-medium">Location *</label>
          <textarea
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          ></textarea>
          {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
        </div>

        <div>
          <label className="block font-medium">Required Skills *</label>
          <select
            multiple
            value={formData.requiredSkills}
            onChange={handleMultiSelectChange}
            className="w-full border p-2 rounded h-32"
          >
            {skillsOptions.map((skill) => (
              <option key={skill} value={skill}>
                {skill}
              </option>
            ))}
          </select>
          {errors.requiredSkills && <p className="text-red-500 text-sm">{errors.requiredSkills}</p>}
        </div>

        <div>
          <label className="block font-medium">Urgency *</label>
          <select
            name="urgency"
            value={formData.urgency}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          >
            <option value="">-- Select Urgency --</option>
            {urgencyOptions.map((urgency) => (
              <option key={urgency} value={urgency}>
                {urgency}
              </option>
            ))}
          </select>
          {errors.urgency && <p className="text-red-500 text-sm">{errors.urgency}</p>}
        </div>

        <div>
          <label className="block font-medium">Event Date *</label>
          <input
            type="date"
            name="eventDate"
            value={formData.eventDate}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          {errors.eventDate && <p className="text-red-500 text-sm">{errors.eventDate}</p>}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Create Event
        </button>
      </form>
    </div>
  );
}

export default EventManagementForm;

