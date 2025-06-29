// main-backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const User = require('../models/User');

/**
 * @route   POST /api/auth/signup
 * @desc    Register a new user
 */
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    const initialScore = Math.floor(Math.random() * 500) + 50;
    const initialSolved = Math.floor(Math.random() * 10) + 1;
    
    user = new User({ 
      name, 
      email, 
      password,
      totalScore: initialScore,
      solvedCount: initialSolved
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    await user.save();
    
    res.status(201).json({ message: 'User created successfully!', userId: user.id });

  } catch (err) {
    console.error('Signup Server Error:', err.message);
    res.status(500).send('Server error during signup process.');
  }
});

/**
 * @route   POST /api/auth/login
 * @desc    Authenticate a user
 */
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    const userForClient = {
        _id: user._id,
        name: user.name,
        email: user.email,
        title: user.title,
        github: user.github,
        linkedin: user.linkedin,
        solvedCount: user.solvedCount,
        totalScore: user.totalScore,
    };
    
    res.status(200).json({ 
      message: 'Login successful!', 
      user: userForClient 
    });

  } catch (err) {
    console.error('Login Server Error:', err.message);
    res.status(500).send('Server error during login.');
  }
});

module.exports = router;