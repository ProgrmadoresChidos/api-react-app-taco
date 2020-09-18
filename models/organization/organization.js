const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const { validateName, validatePhoneNumber } = require('../../utils');

const organizationSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: [true, 'Please enter a name'],
    validate: [validateName, 'Please just enter letters'],
  },
  lastName: {
    type: String,
    required: [true, 'Please enter a last name'],
    validate: [validateName, 'Please just enter letters'],
  },
  phoneNumber: {
    type: String,
    required: true,
    validate: [validatePhoneNumber, 'Please enter a valid phone number'],
  }
});

organizationSchema.plugin(uniqueValidator, { message: 'Organization name already exists' });

module.exports = mongoose.model('organization', organizationSchema);