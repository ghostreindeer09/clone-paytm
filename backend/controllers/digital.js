const Digital = require('../models/digital');

exports.createDigitalPurchase = async (req, res) => {
  try {
    const purchase = new Digital({ ...req.body, user: req.user._id });
    // Mock external API call for digital purchase
    const mockApiResponse = await mockDigitalApi(purchase);
    if (!mockApiResponse.success) {
      purchase.status = 'failed';
    } else {
      purchase.status = 'success';
    }
    await purchase.save();
    res.status(201).json(purchase);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getDigitalPurchases = async (req, res) => {
  try {
    const purchases = await Digital.find({ user: req.user._id });
    res.json(purchases);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mock function simulating an external digital purchase API
async function mockDigitalApi(purchase) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}
