const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const path = require('path');
const User = require('../models/User');
const authenticateToken = require('../middleware/authMiddleware');
require('dotenv').config();
const axios = require('axios');


const router = express.Router();

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Directory to save uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

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

    const salt = await bcrypt.genSalt(12); // Increased salt rounds for hashing
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

    if (!user) {
      return res.status(400).json({ message: 'No user found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Password does not match' });
    }

    const payload = { id: user._id, name: user.name, email: user.email, username: user.username };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    console.error('Error during user login:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// GET /UserProfile - Fetch the user's profile data
router.get('/UserProfile', authenticateToken, async (req, res) => {
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

// PUT /UserProfile - Update the user's profile data
router.put('/UserProfile', authenticateToken, upload.single('photo'), async (req, res) => {
  const { name, email, username } = req.body;
  const photo = req.file ? `/uploads/${req.file.filename}` : null; // Get the path of the uploaded photo

  if (!name || !email || !username) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.name = name;
    user.email = email;
    user.username = username;
    if (photo) user.photo = photo; // Update photo if a new one is provided

    await user.save();
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating profile:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// PUT /UserProfile/address - Update the user's address
router.put('/UserProfile/address', authenticateToken, async (req, res) => {
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

// POST /UserProfile/solar-estimate - Get solar estimate for the user's address
router.post('/UserProfile/solar-estimate', authenticateToken, async (req, res) => {
  const { address, zipcode } = req.body;

  if (!address || !zipcode) {
    return res.status(400).json({ message: 'Address and zipcode are required' });
  }

  try {
    const response = await axios.get('https://www.googleapis.com/sunroof/v1/estimate', {
      params: {
        address: `${address}, ${zipcode}`,
        key: process.env.GOOGLE_API_KEY, // Ensure this is set in your .env file
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
