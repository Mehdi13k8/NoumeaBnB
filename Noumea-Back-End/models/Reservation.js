const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  room: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Room',
    required: true
  },
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  numberOfAdults: {
    type: Number,
    required: true
  },
  numberOfChildren: {
    type: Number,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true
  },
  // Add additional fields as needed
});

reservationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Reservations', reservationSchema);
