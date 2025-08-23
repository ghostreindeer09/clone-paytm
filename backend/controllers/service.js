const Service = require('../models/service');

exports.createServiceBooking = async (req, res) => {
  try {
    const service = new Service({ ...req.body, user: req.user._id });
    // Mock external API call for service booking
    const mockApiResponse = await mockServiceApi(service);
    if (!mockApiResponse.success) {
      service.status = 'failed';
    } else {
      service.status = 'confirmed';
    }
    await service.save();
    res.status(201).json(service);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getServiceBookings = async (req, res) => {
  try {
    const services = await Service.find({ user: req.user._id });
    res.json(services);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Mock function simulating an external service booking API
async function mockServiceApi(service) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}
