const express = require('express');
const User = require('../models/User');
const auth = require('../middleware/auth');
const { validateUpdateUser } = require('../middleware/validation');

const router = express.Router();

/**
 * @route   GET /api/users/profile
 * @desc    Get current user profile
 * @access  Private
 */
router.get('/profile', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.json(user);
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

/**
 * @route   PUT /api/users/profile
 * @desc    Update user profile
 * @access  Private
 */
router.put('/profile', [auth, validateUpdateUser], async (req, res) => {
  try {
    const {
      name,
      phone,
      location,
      title,
      company,
      website,
      bio,
      profileImage,
    } = req.body;

    // Find user and update profile
    const user = await User.findById(req.user.userId);
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Update fields if provided
    if (name) user.name = name;
    if (phone) user.phone = phone;
    if (location) user.location = location;
    if (title) user.title = title;
    if (company) user.company = company;
    if (website) user.website = website;
    if (bio) user.bio = bio;
    if (profileImage) user.profileImage = profileImage;
    
    await user.save();
    
    // Return updated user data (excluding password)
    res.json({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone,
      location: user.location,
      title: user.title,
      company: user.company,
      website: user.website,
      bio: user.bio,
      profileImage: user.profileImage,
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;