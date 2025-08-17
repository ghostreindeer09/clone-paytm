const mongoose = require('mongoose');

const FinancialSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['loan_emi', 'insurance_premium', 'investment'],
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  accountNumber: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'paid', 'failed'],
    default: 'pending'
  },
  dueDate: {
    type: Date
  },
  paidAt: {
    type: Date
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Financial', FinancialSchema);
