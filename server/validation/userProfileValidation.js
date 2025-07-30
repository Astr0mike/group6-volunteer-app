

exports.validateUserProfile = (data) => {
  const errors = {};

  // Username 
  if (!data.username || typeof data.username !== 'string' || data.username.trim().length === 0) {
    errors.username = 'Username is required.';
  } else if (data.username.length > 30) {
    errors.username = 'Username cannot exceed 30 characters.';
  }

  // Full Name 
  if (!data.fullName || typeof data.fullName !== 'string' || data.fullName.trim().length === 0) {
    errors.fullName = 'Full name is required.';
  } else if (data.fullName.length > 50) {
    errors.fullName = 'Full name cannot exceed 50 characters.';
  }

  // Address 1 
  if (!data.address1 || typeof data.address1 !== 'string' || data.address1.trim().length === 0) {
    errors.address1 = 'Address Line 1 is required.';
  } else if (data.address1.length > 100) {
    errors.address1 = 'Address Line 1 cannot exceed 100 characters.';
  }

  // Address 2 
  if (data.address2 && data.address2.length > 100) {
    errors.address2 = 'Address Line 2 cannot exceed 100 characters.';
  }

  // City 
  if (!data.city || typeof data.city !== 'string' || data.city.trim().length === 0) {
    errors.city = 'City is required.';
  } else if (data.city.length > 100) {
    errors.city = 'City cannot exceed 100 characters.';
  }

  // State 
  if (!data.state || typeof data.state !== 'string' || !/^[A-Z]{2}$/.test(data.state)) {
    errors.state = 'State code is required and must be 2 uppercase letters.';
  }

  // Zip 
  if (!data.zip || typeof data.zip !== 'string' || data.zip.trim().length < 5) {
    errors.zip = 'Zip code is required and must be at least 5 characters.';
  } else if (!/^[0-9]{5}(-[0-9]{4})?$/.test(data.zip)) {
    errors.zip = 'Zip code must be 5 digits or ZIP+4 format (12345 or 12345-6789).';
  }

  // Skills 
  if (!Array.isArray(data.skills) || data.skills.length === 0) {
    errors.skills = 'At least one skill must be selected.';
  }

  // Other Skills 
  if (data.otherSkills && typeof data.otherSkills !== 'string') {
    errors.otherSkills = 'Other skills must be text.';
  }

  // Preferences 
  if (data.preferences && typeof data.preferences !== 'string') {
    errors.preferences = 'Preferences must be text.';
  }

  if (!Array.isArray(data.availability) || data.availability.length === 0) {
    errors.availability = 'At least one availability date must be selected.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
