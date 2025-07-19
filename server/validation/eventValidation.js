exports.validateEvent = (data) => {
  const errors = {};

  if (!data.eventName || typeof data.eventName !== 'string' || data.eventName.trim() === '') {
    errors.eventName = 'Event Name is required.';
  } else if (data.eventName.length > 100) {
    errors.eventName = 'Event Name cannot exceed 100 characters.';
  }

  if (!data.eventDescription || typeof data.eventDescription !== 'string' || data.eventDescription.trim() === '') {
    errors.eventDescription = 'Event Description is required.';
  } else if (data.eventDescription.length > 500) {
    errors.eventDescription = 'Event Description cannot exceed 500 characters.';
  }

  if (!data.location || typeof data.location !== 'string' || data.location.trim() === '') {
    errors.location = 'Location is required.';
  }

  if (!Array.isArray(data.requiredSkills) || data.requiredSkills.length === 0) {
    errors.requiredSkills = 'Please select at least one skill.';
  } else {
    const invalidSkills = data.requiredSkills.filter(skill => typeof skill !== 'string' || skill.trim() === '');
    if (invalidSkills.length > 0) {
      errors.requiredSkills = 'All skills must be non-empty strings.';
    }
  }

  const allowedUrgencies = ['Low', 'Medium', 'High', 'Critical'];
  if (!data.urgency || typeof data.urgency !== 'string') {
    errors.urgency = 'Urgency is required.';
  } else if (!allowedUrgencies.includes(data.urgency)) {
    errors.urgency = `Urgency must be one of: ${allowedUrgencies.join(', ')}.`;
  }

  if (!data.eventDate || typeof data.eventDate !== 'string') {
    errors.eventDate = 'Event Date is required.';
  } else {
    const parsedDate = Date.parse(data.eventDate);
    if (isNaN(parsedDate)) {
      errors.eventDate = 'Event Date must be a valid date string.';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
