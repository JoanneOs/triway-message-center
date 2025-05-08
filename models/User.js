// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User roles for authorization
const ROLES = {
  DRIVER: 'driver',
  DISPATCHER: 'dispatcher'
};

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { 
    type: String, 
    required: true, 
    unique: true,
    match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address']
  },
  password: { type: String, required: true, select: false },
  role: { 
    type: String, 
    required: true, 
    enum: Object.values(ROLES),
    default: ROLES.DRIVER
  },
  createdAt: { type: Date, default: Date.now }
}, { versionKey: false });

// Password hashing before save
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);
module.exports.ROLES = ROLES;