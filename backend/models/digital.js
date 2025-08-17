const mongoose = require('mongoose');

const DigitalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['gaming_topup', 'streaming_subscription', 'app_purchase'],
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  accountId: {
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
  purchasedAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Digital', DigitalSchema);
