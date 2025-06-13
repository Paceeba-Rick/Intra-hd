/**
 * Form validation for different order types
 */

export const validateOrderForm = (formData, residenceType) => {
  const errors = {};

  // Validate common fields
  if (!formData.name || formData.name.trim() === '') {
    errors.name = 'Full name is required';
  }

  if (!formData.orderDescription || formData.orderDescription.trim() === '') {
    errors.orderDescription = 'Order description is required';
  }

  if (!formData.orderAmount) {
    errors.orderAmount = 'Order amount is required';
  } else if (isNaN(parseFloat(formData.orderAmount)) || parseFloat(formData.orderAmount) <= 0) {
    errors.orderAmount = 'Please enter a valid amount';
  }

  if (!formData.phoneNumber || formData.phoneNumber.trim() === '') {
    errors.phoneNumber = 'Phone number is required';
  } else if (!isValidGhanaPhoneNumber(formData.phoneNumber)) {
    errors.phoneNumber = 'Please enter a valid Ghana phone number';
  }

  // Validate residence-specific fields
  switch (residenceType) {
    case 'legon-hall':
      if (!formData.block || formData.block.trim() === '') {
        errors.block = 'Block is required';
      }
      if (!formData.room || formData.room.trim() === '') {
        errors.room = 'Room number is required';
      }
      break;
    case 'traditional-halls':
      if (!formData.hall || formData.hall === '') {
        errors.hall = 'Hall name is required';
      }
      break;
    case 'hostels':
      if (!formData.hostel || formData.hostel === '') {
        errors.hostel = 'Hostel name is required';
      }
      if (!formData.block || formData.block.trim() === '') {
        errors.block = 'Block is required';
      }
      break;
    default:
      break;
  }

  return errors;
};

// Helper function to validate Ghana phone numbers
const isValidGhanaPhoneNumber = (phoneNumber) => {
  // Ghana phone number format: +233xxxxxxxxx or 0xxxxxxxxx (10 digits)
  const ghanaPhoneRegex = /^(?:\+233|0)[2-9][0-9]{8}$/;
  return ghanaPhoneRegex.test(phoneNumber);
};