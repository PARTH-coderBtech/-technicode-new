const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  resetPasswordOTP: {
  type: String,
  default: null,
},

resetPasswordOTPExpire: {
  type: Date,
  default: null,
},
});

module.exports = mongoose.model('User', UserSchema);