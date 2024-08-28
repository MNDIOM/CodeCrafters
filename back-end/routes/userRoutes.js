const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware'); // Import the authentication middleware
require('dotenv').config();
const axios = require('axios');

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
      return res.status(400).json({ message: 'no user found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match:', isMatch); // Log the result of the password comparison

    if (!isMatch) {
      console.log('Password does not match');
      return res.status(400).json({ message: 'password does not match!' });
    }

    const payload = { id: user._id, name: user.name, email: user.email, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /profile - Fetch the user's profile data
router.get('/profile', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /profile/address - Update the user's address
router.put('/profile/address', authenticateToken, async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ message: 'Address is required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.address = address;
    await user.save();

    res.status(200).json({ message: 'Address updated successfully' });
  } catch (error) {
    console.error('Error updating address:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// POST /profile/solar - Get solar estimate for the user's address
router.post('/profile/solar', authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user || !user.address) {
      return res.status(400).json({ message: 'Address is required' });
    }

    const response = await axios.get('https://www.googleapis.com/sunroof/v1/estimate', {
      params: {
        address: user.address,
        key: process.env.GOOGLE_API_KEY, // Make sure to set this in your .env file
      },
    });

    const solarEstimate = response.data;
    res.status(200).json({ message: 'Solar estimate fetched successfully', solarEstimate });
  } catch (error) {
    console.error('Error fetching solar estimate:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
