const Bill = require('../models/bill');

exports.createBillPayment = async (req, res) => {
  try {
    const bill = new Bill({ ...req.body, user: req.user._id });
    await bill.save();
    res.status(201).json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find({ user: req.user._id });
    res.json(bills);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.payBill = async (req, res) => {
  try {
    const bill = await Bill.findOne({ _id: req.params.id, user: req.user._id });
    if (!bill) return res.status(404).json({ error: 'Bill not found' });
    if (bill.status === 'paid') return res.status(400).json({ error: 'Bill already paid' });

    // Mock external API call for bill payment
    const mockApiResponse = await mockBillPaymentApi(bill);
    if (!mockApiResponse.success) {
      bill.status = 'failed';
      await bill.save();
      return res.status(400).json({ error: 'Payment failed with provider' });
    }

    bill.status = 'paid';
    bill.paidAt = new Date();
    await bill.save();
    res.json(bill);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mock function simulating an external bill payment API
async function mockBillPaymentApi(bill) {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 500));
  // Always return success
  return { success: true };
}
