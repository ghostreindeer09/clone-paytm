const User = require('../models/user');
const Transaction = require('../models/transaction');

exports.addMoney = async (req, res) => {
  try {
    const userId = req.user.id; // Assume user ID is set by auth middleware
    const { amount } = req.body;

    // Validate amount
    if (!amount || amount <= 0) {
      return res.status(400).json({ msg: 'Invalid amount' });
    }

    // Fetch user from DB
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update wallet balance
    user.walletBalance += amount;
    await user.save();

    // Create a transaction record
    const transaction = new Transaction({
      sender: user._id,
      receiver: user._id, // Self-deposit
      amount,
      type: 'deposit'
    });
    await transaction.save();

    // Respond with updated balance
    res.json({ balance: user.walletBalance, msg: 'Money added successfully' });

  } catch (error) {
    console.error('Add money error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.pay = async (req, res) => {
  try {
    const senderId = req.user.id;
    const { recipientEmail, amount } = req.body;

    if (!recipientEmail || !amount || amount <= 0) {
      return res.status(400).json({ msg: 'Invalid payment details' });
    }

    const sender = await User.findById(senderId);
    const recipient = await User.findOne({ email: recipientEmail });

    if (!sender || !recipient) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (sender.email === recipientEmail) {
        return res.status(400).json({ msg: "You cannot pay yourself." });
    }

    if (sender.walletBalance < amount) {
      return res.status(400).json({ msg: 'Insufficient balance' });
    }

    sender.walletBalance -= amount;
    recipient.walletBalance += amount;

    await sender.save();
    await recipient.save();

    const transaction = new Transaction({
      sender: sender._id,
      receiver: recipient._id,
      amount,
      type: 'transfer'
    });
    await transaction.save();

    res.json({ balance: sender.walletBalance, msg: 'Payment successful' });

  } catch (error) {
    console.error('Payment error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
