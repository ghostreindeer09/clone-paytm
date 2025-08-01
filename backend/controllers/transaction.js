const Transaction = require('../models/transaction');
const User = require('../models/user');

exports.getTransactions = async (req, res) => {
  try {
    const userId = req.user.id; // user ID set by authentication middleware

    // Pagination parameters with defaults
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    // Verify user exists (optional check)
    const userExists = await User.exists({ _id: userId });
    if (!userExists) {
      return res.status(404).json({ msg: "User not found" });
    }

    // Fetch paginated transactions for the user, newest first
    const transactions = await Transaction.find({ $or: [{ sender: userId }, { receiver: userId }] })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    // Get total count for pagination info
    const total = await Transaction.countDocuments({ $or: [{ sender: userId }, { receiver: userId }] });

    // Return transactions with pagination metadata
    res.json({
      transactions,
      page,
      limit,
      total,
    });
  } catch (error) {
    console.error("Error fetching transactions:", error);
    res.status(500).json({ msg: "Server error" });
  }
};
