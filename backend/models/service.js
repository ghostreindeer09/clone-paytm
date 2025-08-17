const mongoose = require('mongoose');

const ServiceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['healthcare', 'home_service', 'education_fee'],
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  serviceDetails: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'failed'],
    default: 'pending'
  },
  appointmentDate: {
    type: Date
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Service', ServiceSchema);
