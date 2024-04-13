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
  // user who made the reservation
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
});

reservationSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Reservations', reservationSchema);
