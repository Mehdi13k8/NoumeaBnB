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
  weeklyPrice : {
    type: Number,
    required: true
  },
  weekendPrice : {
    type: Number,
    required: true
  },
  childrenPrice : {
    type: Number,
    required: true
  },
  childrenWeekendPrice : {
    type: Number,
    required: true
  },
  childrenBedPrice : {
    type: Number,
    required: true
  },
  // Add additional fields as necessary
});

// roomSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Room', roomSchema);
