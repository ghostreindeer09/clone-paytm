const Shopping = require('../models/shopping');

exports.createOrder = async (req, res) => {
  try {
    const order = new Shopping({ ...req.body, user: req.user._id });
    // Mock external API call for order placement
    const mockApiResponse = await mockOrderApi(order);
    if (!mockApiResponse.success) {
      order.status = 'failed';
    } else {
      order.status = 'delivered';
    }
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getOrders = async (req, res) => {
  try {
    const orders = await Shopping.find({ user: req.user._id });
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mock function simulating an external order API
async function mockOrderApi(order) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: Math.random() > 0.1 };
}
