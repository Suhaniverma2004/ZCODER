// zcoder-backend/routes/auth.js

const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Library for hashing passwords
const User = require('../models/User'); // Your User model

// --- SIGNUP ROUTE ---
// Handles new user registration
router.post('/signup', async (req, res) => {
  const { name, email, password } = req.body;

  // Basic validation
  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  try {
    // 1. Check if a user with that email already exists in the database
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }

    // 2. If the user is new, create a new user instance
    user = new User({ name, email, password });

    // 3. Hash the password before saving it to the database
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);

    // 4. Save the new user to the database
    await user.save();

      user = new User({ 
      name, 
      email, 
      password,
      totalScore: initialScore,  // Add initial score
      solvedCount: initialSolved
    });
    
    // Send back a success response
    res.status(201).json({ message: 'User created successfully!', userId: user.id });

  } catch (err) {
    console.error('Signup Error:', err.message);
    res.status(500).send('Server Error');
  }
  const initialScore = Math.floor(Math.random() * 500) + 50; // Random score between 50-550
    const initialSolved = Math.floor(Math.random() * 10) + 1;  // Random solved count 1-11

});


// --- LOGIN ROUTE ---
// Handles existing user login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  // Basic validation
  if (!email || !password) {
    return res.status(400).json({ message: 'Please enter all fields.' });
  }

  try {
    // 1. Check if a user with that email exists
    const user = await User.findOne({ email });
    if (!user) {
      // Use a generic message for security - don't reveal if the email exists
      return res.status(400).json({ message: 'Invalid credentials.' });
    }

    // 2. If the user exists, compare the submitted password with the hashed password in the DB
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials.' });
    }
    
    // 3. If passwords match, login is successful
    res.status(200).json({ 
      message: 'Login successful!', 
      userId: user.id, 
      name: user.name 
    });

  } catch (err) {
    console.error('Login Error:', err.message);
    res.status(500).send('Server Error');
  }
  
});

module.exports = router;