const User = require('../models/user');

exports.getProfile = async (req, res) => {
  try {
    const userId = req.user.id; // set by auth middleware

    const user = await User.findById(userId).select('-password'); // exclude password
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { name, email } = req.body;

    // Optional: validate inputs (name, email format, etc.) here

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update fields only if they are provided
    if (name) user.name = name;
    if (email) user.email = email;

    await user.save();

    // Return updated user profile (excluding password)
    const updatedUser = await User.findById(userId).select('-password');
    res.json(updatedUser);
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};
