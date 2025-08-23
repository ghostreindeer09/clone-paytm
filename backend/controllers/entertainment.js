const EntertainmentBooking = require('../models/entertainment');

exports.createBooking = async (req, res) => {
  try {
    const booking = new EntertainmentBooking({ ...req.body, user: req.user._id });
    // Mock external API call for booking
    const mockApiResponse = await mockBookingApi(booking);
    if (!mockApiResponse.success) {
      booking.status = 'failed';
    } else {
      booking.status = 'confirmed';
    }
    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const bookings = await EntertainmentBooking.find({ user: req.user._id });
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await EntertainmentBooking.findOne({ _id: req.params.id, user: req.user._id });
    if (!booking) return res.status(404).json({ error: 'Booking not found' });
    if (booking.status === 'cancelled') return res.status(400).json({ error: 'Booking already cancelled' });
    booking.status = 'cancelled';
    await booking.save();
    res.json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Mock function simulating an external booking API
async function mockBookingApi(booking) {
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true };
}
