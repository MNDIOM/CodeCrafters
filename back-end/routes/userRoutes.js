const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware'); // Import the authentication middleware
require('dotenv').config();

const router = express.Router();

// POST /signup - Route to handle user signup
router.post('/signup', async (req, res) => {
  const { name, email, password, username } = req.body;

  if (!name || !email || !password || !username) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username or email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      username,
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    console.error('Error during user signup:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /login - Route to handle user login
router.post('/login', async (req, res) => {
  const { identifier, password } = req.body;

  if (!identifier || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findOne({ $or: [{ email: identifier }, { username: identifier }] });
    console.log('User found:', user); // Log the found user

    if (!user) {
      console.log('No user found with that identifier');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Log the result of the password comparison

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const payload = { id: user._id, name: user.name, email: user.email, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /profile - Example of a protected route
router.get('/profile', authenticateToken, (req, res) => {
  res.status(200).json({ message: 'This is a protected route', user: req.user });
});

module.exports = router;
