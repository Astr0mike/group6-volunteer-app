import React, { useState } from 'react';
import '../css/UserProfile.css';
import DatePicker from 'react-multi-date-picker';

const states = [
  { name: 'Alabama', code: 'AL' },
  { name: 'Alaska', code: 'AK' },
  { name: 'Arizona', code: 'AZ' },
  { name: 'Arkansas', code: 'AR' },
  { name: 'California', code: 'CA' },
  { name: 'Colorado', code: 'CO' },
  { name: 'Connecticut', code: 'CT' },
  { name: 'Delaware', code: 'DE' },
  { name: 'Florida', code: 'FL' },
  { name: 'Georgia', code: 'GA' },
  { name: 'Hawaii', code: 'HI' },
  { name: 'Idaho', code: 'ID' },
  { name: 'Illinois', code: 'IL' },
  { name: 'Indiana', code: 'IN' },
  { name: 'Iowa', code: 'IA' },
  { name: 'Kansas', code: 'KS' },
  { name: 'Kentucky', code: 'KY' },
  { name: 'Louisiana', code: 'LA' },
  { name: 'Maine', code: 'ME' },
  { name: 'Maryland', code: 'MD' },
  { name: 'Massachusetts', code: 'MA' },
  { name: 'Michigan', code: 'MI' },
  { name: 'Minnesota', code: 'MN' },
  { name: 'Mississippi', code: 'MS' },
  { name: 'Missouri', code: 'MO' },
  { name: 'Montana', code: 'MT' },
  { name: 'Nebraska', code: 'NE' },
  { name: 'Nevada', code: 'NV' },
  { name: 'New Hampshire', code: 'NH' },
  { name: 'New Jersey', code: 'NJ' },
  { name: 'New Mexico', code: 'NM' },
  { name: 'New York', code: 'NY' },
  { name: 'North Carolina', code: 'NC' },
  { name: 'North Dakota', code: 'ND' },
  { name: 'Ohio', code: 'OH' },
  { name: 'Oklahoma', code: 'OK' },
  { name: 'Oregon', code: 'OR' },
  { name: 'Pennsylvania', code: 'PA' },
  { name: 'Rhode Island', code: 'RI' },
  { name: 'South Carolina', code: 'SC' },
  { name: 'South Dakota', code: 'SD' },
  { name: 'Tennessee', code: 'TN' },
  { name: 'Texas', code: 'TX' },
  { name: 'Utah', code: 'UT' },
  { name: 'Vermont', code: 'VT' },
  { name: 'Virginia', code: 'VA' },
  { name: 'Washington', code: 'WA' },
  { name: 'West Virginia', code: 'WV' },
  { name: 'Wisconsin', code: 'WI' },
  { name: 'Wyoming', code: 'WY' }
];

const skillsList = [
  'First Aid',
  'Public Speaking',
  'Event Planning',
  'Fundraising',
  'Data Entry',
  'Social Media Management',
  'Graphic Design',
  'Tutoring',
  'Community Outreach',
  'Childcare Assistance',
  'Food Distribution',
  'Translation',
  'Photography',
  'Microsoft Office',
  'CPR Certification',
  'Driving',
  'Crowd Management',
  'Web Design',
  'Volunteer Coordination',
  'Grant Writing'
];

const UserProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    zip: '',
    skills: [],
    otherSkills: '',
    preferences: '',
    availability: []
  });
  const [showSkillDropdown, setShowSkillDropdown] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.fullName || !formData.address1 ||
        !formData.city || !formData.state || formData.zip.length < 5 ||
        formData.skills.length === 0 || formData.availability.length === 0) {
      alert('Please fill out all required fields correctly.');
      return;
    }

    const normalizedAvailability = formData.availability.map(d =>
      d && typeof d.format === 'function' ? d.format('YYYY-MM-DD') : String(d)
    );
    const payload = { ...formData, availability: normalizedAvailability };

    try {
      const response = await fetch('http://localhost:3001/api/user-profiles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!response.ok) {
        const error = await response.json();
        alert('Error: ' + (error.error || JSON.stringify(error)));
        return;
      }
      setSubmitted(true);
    } catch (err) {
      alert('Submission failed, please try again later.');
      console.error(err);
    }
  };

  return (
    <div className="form-container">
      <h2>User Profile</h2>
      {submitted ? (
        <p className="success">Profile submitted successfully!</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <label>Username*</label>
          <input name="username" value={formData.username} maxLength={30}
            onChange={handleChange} required />
          <label>Full Name*</label>
          <input name="fullName" value={formData.fullName} maxLength={50}
            onChange={handleChange} required />
          <label>Address 1*</label>
          <input name="address1" value={formData.address1} maxLength={100}
            onChange={handleChange} required />
          <label>Address 2</label>
          <input name="address2" value={formData.address2} maxLength={100}
            onChange={handleChange} />
          <label>City*</label>
          <input name="city" value={formData.city} maxLength={100}
            onChange={handleChange} required />
          <label>State*</label>
          <select name="state" value={formData.state}
            onChange={handleChange} required>
            <option value="">Select a state</option>
            {states.map(s => <option key={s.code} value={s.code}>{s.name}</option>)}
          </select>
          <label>Zip Code*</label>
          <input name="zip" value={formData.zip} maxLength={9}
            onChange={handleChange} required />
          <label>Skills* (Select all that apply):</label>
          <div className="custom-dropdown">
            <div className="dropdown-header" onClick={() => setShowSkillDropdown(!showSkillDropdown)}>
              {formData.skills.length ? formData.skills.join(', ') : 'Select skills'}
              <span className="dropdown-arrow">{showSkillDropdown ? '▲' : '▼'}</span>
            </div>
            {showSkillDropdown && (
              <div className="dropdown-options">
                {skillsList.map(skill => (
                  <label key={skill} className="checkbox-option">
                    <input type="checkbox" value={skill}
                      checked={formData.skills.includes(skill)}
                      onChange={e => {
                        const { checked, value } = e.target;
                        setFormData(prev => {
                          const skills = checked
                            ? [...prev.skills, value]
                            : prev.skills.filter(s => s !== value);
                          return { ...prev, skills };
                        });
                      }} />
                    {skill}
                  </label>
                ))}
              </div>
            )}
          </div>
          <label>Preferences</label>
          <textarea name="preferences" value={formData.preferences}
            onChange={handleChange} rows="4" />
          <label>Availability (Select one or more dates)*</label>
          <div className="datepicker-wrapper">
            <DatePicker multiple value={formData.availability}
              onChange={dates => setFormData(prev => ({ ...prev, availability: dates }))}
              required format="MM/DD/YYYY" />
          </div>
          <button type="submit">Submit Profile</button>
        </form>
      )}
    </div>
  );
};

export default UserProfile;
