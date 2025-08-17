const mongoose = require('mongoose');

const BillSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  category: {
    type: String,
    enum: ['electricity', 'water', 'gas', 'internet', 'cable_tv', 'municipal_tax', 'property_tax'],
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

module.exports = mongoose.model('Bill', BillSchema);
