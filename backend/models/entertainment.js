const mongoose = require('mongoose');

const EntertainmentBookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['movie', 'event', 'concert', 'sports', 'bus', 'train', 'flight'],
    required: true
  },
  title: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  bookingId: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'cancelled', 'failed'],
    default: 'pending'
  },
  eventDate: {
    type: Date
  },
  bookedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('EntertainmentBooking', EntertainmentBookingSchema);
