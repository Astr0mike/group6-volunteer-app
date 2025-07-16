
exports.validateEvent = (data) => {
  const errors = {};

  if (!data.eventName || typeof data.eventName !== 'string' || data.eventName.trim() === '') {
    errors.eventName = 'Event Name is required.';
  } else if (data.eventName.length > 100) {
    errors.eventName = 'Event Name cannot exceed 100 characters.';
  }

  if (!data.eventDescription || typeof data.eventDescription !== 'string' || data.eventDescription.trim() === '') {
    errors.eventDescription = 'Event Description is required.';
  }

  if (!data.location || typeof data.location !== 'string' || data.location.trim() === '') {
    errors.location = 'Location is required.';
  }

  if (!Array.isArray(data.requiredSkills) || data.requiredSkills.length === 0) {
    errors.requiredSkills = 'Please select at least one skill.';
  }

  if (!data.urgency || typeof data.urgency !== 'string') {
    errors.urgency = 'Urgency is required.';
  }

  if (!data.eventDate || typeof data.eventDate !== 'string') {
    errors.eventDate = 'Event Date is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
};
