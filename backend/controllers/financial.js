const Financial = require('../models/financial');

exports.createFinancialPayment = async (req, res) => {
  try {
    const payment = new Financial({ ...req.body, user: req.user._id });
    // Mock external API call for financial payment
    const mockApiResponse = await mockFinancialApi(payment);
    if (!mockApiResponse.success) {
      payment.status = 'failed';
    } else {
      payment.status = 'paid';
    }
    await payment.save();
    res.status(201).json(payment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getFinancialPayments = async (req, res) => {
  try {
    const payments = await Financial.find({ user: req.user._id });
    res.json(payments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mock function simulating an external financial payment API
async function mockFinancialApi(payment) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}
