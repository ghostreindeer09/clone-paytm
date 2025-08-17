const MobileTelecom = require('../models/mobile');

exports.createRecharge = async (req, res) => {
  try {
    const recharge = new MobileTelecom({ ...req.body, user: req.user._id });
    // Mock external API call for recharge
    const mockApiResponse = await mockRechargeApi(recharge);
    if (!mockApiResponse.success) {
      recharge.status = 'failed';
    } else {
      recharge.status = 'success';
    }
    await recharge.save();
    res.status(201).json(recharge);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getRecharges = async (req, res) => {
  try {
    const recharges = await MobileTelecom.find({ user: req.user._id });
    res.json(recharges);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mock function simulating an external recharge API
async function mockRechargeApi(recharge) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: Math.random() > 0.1 };
}
