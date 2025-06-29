const express = require('express');
const router = express.Router();
const User = require('../models/User');

/**
 * @route   PUT /api/users/:id/profile
 * @desc    Update a user's profile information
 */
router.put('/:id/profile', async (req, res) => {
  try {
    const { name, title, github, linkedin } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, title, github, linkedin },
      { new: true } // This option returns the updated document
    ).select('-password');

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found in database.' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error('SERVER ERROR while updating profile:', err);
    res.status(500).json({ message: 'Server error while updating profile.' });
  }
});

module.exports = router;