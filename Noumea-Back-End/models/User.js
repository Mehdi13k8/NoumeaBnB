// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  // Active users
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt timestamps
});

// Middleware to hash password before saving a user
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
};

// Method to create token
userSchema.methods.createToken = function() {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET);
}

// check token validity
userSchema.statics.checkToken = async function(token) {
  return jwt.verify(token, process.env.JWT_SECRET);
}

// who is logged from token
userSchema.statics.whoIsLogged = async function(token) {
  // remove bearer from token
  token = token.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  return await this.findById(decoded.id);
}

// get all reseravations of a user
userSchema.virtual('reservations', {
  ref: 'Reservation',
  localField: '_id',
  foreignField: 'user'
});


userSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', userSchema);
