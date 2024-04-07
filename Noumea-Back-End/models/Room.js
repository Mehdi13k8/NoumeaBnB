const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  isAvailable: {
    type: Boolean,
    default: true
  },
  price: {
    type: Number,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  photo: {
    type: String,
    required: true
  },
  // all photos
  photos: {
    type: Array,
    required: true
  },
  // all reviews
  reviews: {
    type: Array,
    required: true
  },
  // Add additional fields as necessary
});

// roomSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Room', roomSchema);
