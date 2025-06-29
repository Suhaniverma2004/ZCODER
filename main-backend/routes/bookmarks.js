const express = require('express');
const router = express.Router();
const Bookmark = require('../models/Bookmark');
const User = require('../models/User');

/**
 * @route   POST /api/bookmarks
 * @desc    Create a new bookmark for a user and a problem
 */
router.post('/', async (req, res) => {
  const { userId, problemId } = req.body;

  try {
    // Check if this bookmark already exists to prevent duplicates
    const existingBookmark = await Bookmark.findOne({ user: userId, problem: problemId });
    if (existingBookmark) {
      return res.status(400).json({ message: 'Problem already bookmarked.' });
    }

    const newBookmark = new Bookmark({
      user: userId,
      problem: problemId,
    });
    await newBookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    console.error('Error creating bookmark:', err);
    res.status(500).json({ message: 'Server error while creating bookmark.' });
  }
});

/**
 * @route   GET /api/bookmarks/user/:userId
 * @desc    Get all bookmarks for a specific user
 */
router.get('/user/:userId', async (req, res) => {
  try {
    // Find all bookmarks for the given user ID
    // Then, 'populate' the 'problem' field to include all the details of the problem,
    // not just its ID. This is a very powerful Mongoose feature.
    const bookmarks = await Bookmark.find({ user: req.params.userId })
      .populate('problem'); 

    res.json(bookmarks);
  } catch (err) {
    console.error('Error fetching bookmarks:', err);
    res.status(500).json({ message: 'Server error while fetching bookmarks.' });
  }
});

module.exports = router;