const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  brandName: {
    type: String
  },
  brandLogo: {
    type: String
  },
  isBrand: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('User', userShema);
