const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: false,
  },
  age: {
    type: Number,
    required: false,
  },
  password: {
    type: String,
    required: true,
  },
  isUserVerified: {
    type: Boolean,
    required: true,
  },
  userVerificationCode: {
    type: String,
    required: false,
  },
});

module.exports = mongoose.model('User', UserSchema);
