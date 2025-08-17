const mongoose = require('mongoose');

const MobileTelecomSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['mobile_recharge', 'dth_recharge', 'postpaid_bill'],
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  mobileNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'success', 'failed'],
    default: 'pending'
  },
  transactionId: {
    type: String
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('MobileTelecom', MobileTelecomSchema);
