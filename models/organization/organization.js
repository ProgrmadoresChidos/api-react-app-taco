const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

const organizationSchema = new mongoose.Schema({
  organization: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  }
});

organizationSchema.plugin(uniqueValidator, { message: 'Organization name already exists' });

module.exports = mongoose.model('organization', organizationSchema);