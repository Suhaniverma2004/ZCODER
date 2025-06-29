const express = require('express');
const router = express.Router();

// --- Import All Necessary Mongoose Models ---
const Problem = require('../models/Problem');
const User = require('../models/User');
const Bookmark = require('../models/Bookmark');

// --- Import the Master List of DSA Questions ---
const dsaProblems = require('../dsaProblemSet');

// ======================================================
// --- API ROUTES ---
// ======================================================

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
      problems = await Problem.find(); // Fetch again to return the new list
    }
    
    res.json(problems);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching problems: ' + err.message });
  }
});

/**
 * @route   GET /api/problems/:problemId
 * @desc    Get a single problem by its unique problemId string.
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
 * @route   GET /api/leaderboard
 * @desc    Get top users sorted by totalScore.
 */
router.get('/leaderboard', async (req, res) => {
  try {
    // Find all users, sort them by totalScore in descending order (-1), and limit to the top 100.
    const topUsers = await User.find()
      .sort({ totalScore: -1 })
      .limit(100)
      .select('-password'); // Crucially, exclude the password hash from the response.

    res.json(topUsers);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching leaderboard data: ' + err.message });
  }
}); // <-- The missing closing curly brace and parenthesis were here.

/**
 * @route   GET /api/users
 * @desc    Get all users from the database (useful for admin or testing).
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password');
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users: ' + err.message });
  }
});

/**
 * @route   POST /api/bookmarks
 * @desc    Create a new bookmark for a user and a problem (example).
 */
router.post('/bookmarks', async (req, res) => {
  const { userId, problemId } = req.body;

  if (!userId || !problemId) {
    return res.status(400).json({ message: 'Both userId and problemId are required.' });
  }

  const bookmark = new Bookmark({
    user: userId,
    problem: problemId,
  });

  try {
    const newBookmark = await bookmark.save();
    res.status(201).json(newBookmark);
  } catch (err) {
    res.status(400).json({ message: 'Error creating bookmark: ' + err.message });
  }
});
router.put('/users/:userId', async (req, res) => {
   console.log(`Received profile update request for user: ${req.params.id}`);
  console.log('Data received:', req.body);
  try {
    const { name, title, email, github, linkedin } = req.body;
    
    // Find the user by their ID and update the specified fields
    const updatedUser = await User.findByIdAndUpdate(
      req.params.userId,
      {
        name,
        // 'title' is from the frontend state, but we don't have a 'title' field in our User model.
        // We'll ignore it on the backend for now, but you could add it to the model if you wish.
        email, 
        github,
        linkedin,
      },
      { new: true } // This option returns the updated document
    ).select('-password'); // Exclude the password from the returned object

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(updatedUser);
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Server error while updating user.' });
  }
});


// --- Export the router ---
// This makes all the routes defined above available to server.js
module.exports = router;