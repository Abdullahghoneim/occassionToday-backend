const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userShema = new Schema({
  name: {
    type: String
  },
  phone: {
    type: String,
    default: null
  },
  email: {
    type: String,
    default: null
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
  }
});

module.exports = mongoose.model('User', userShema);
