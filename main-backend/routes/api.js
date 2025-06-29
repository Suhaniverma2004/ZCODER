// main-backend/routes/api.js

const express = require('express');
const router = express.Router();

// --- Import All Necessary Mongoose Models ---
const Problem = require('../models/Problem');
const User = require('../models/User');
const Bookmark = require('../models/Bookmark');

// --- Import the Master List of DSA Questions for Seeding ---
// Note the path: ../ goes up one level from 'routes' to the root folder
const dsaProblems = require('../dsaProblemSet');

/**
 * @route   GET /api/problems
 * @desc    Get all problems. If the DB is empty, it seeds it with the DSA questions.
 */
router.get('/problems', async (req, res) => {
  try {
    let problems = await Problem.find();
    if (problems.length === 0) {
      console.log('Problem collection is empty. Seeding database with Blind 75...');
      await Problem.insertMany(dsaProblems);
      problems = await Problem.find();
    }
    res.json(problems);
  } catch (err) {
    console.error("Error in /api/problems route:", err);
    res.status(500).json({ message: 'Error on server while fetching problems.' });
  }
});

/**
 * @route   GET /api/problems/:problemId
 * @desc    Get a single problem by its unique problemId string for the chatroom.
 */
router.get('/problems/:problemId', async (req, res) => {
  try {
    const problem = await Problem.findOne({ problemId: req.params.problemId });
    if (!problem) {
      return res.status(404).json({ message: 'Problem not found' });
    }
    res.json(problem);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching problem details: ' + err.message });
  }
});

/**
 * @route   PUT /api/users/:id/profile
 * @desc    Update a user's profile information.
 */

/**
 * @route   GET /api/leaderboard
 * @desc    Get top users sorted by totalScore.
 */
router.get('/leaderboard', async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ totalScore: -1 })
      .limit(100)
      .select('-password');
    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaderboard data: ' + err.message });
  }
});

module.exports = router;