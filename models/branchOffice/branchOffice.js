const mongoose = require('mongoose');
const { validatePhoneNumber, validateScore, validateOpeningHours } = require('../../utils');
const Schema = mongoose.Schema;

// bo -> branch office
const boSchema = new Schema({
  // TODO: Agregar validacion para los updates, checar que exista el ID
  org: {
    type: Schema.Types.ObjectId,
    ref: 'Organization',
    required: [true, 'Please enter a Organization ID']
  },
  address: {
    type: String,
    required: [true, 'Please enter an address']
  },
  phoneNumber: {
    type: String,
    validate: [validatePhoneNumber, 'Please enter a valid phone number'],
  },
  score: {
    type: Number,
    validate: [validateScore, 'Please enter a score between 0 - 5']
  },
  openingHours: {
    type: Object,
    validate: [validateOpeningHours, 'Please enter a valid opening hours format'],
  },
  // menu: {
  //   type: Array,
  // }
  tickets: {
    type: Array,
  }
});

module.exports = mongoose.model('branchOffice', boSchema);