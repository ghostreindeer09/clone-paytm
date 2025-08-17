const mongoose = require('mongoose');

const ShoppingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  type: {
    type: String,
    enum: ['online_shopping', 'food_delivery', 'grocery_delivery', 'gift_voucher'],
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  orderId: {
    type: String,
    required: true
  },
  items: [
    {
      name: String,
      quantity: Number,
      price: Number
    }
  ],
  amount: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'delivered', 'cancelled', 'failed'],
    default: 'pending'
  },
  orderedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Shopping', ShoppingSchema);
