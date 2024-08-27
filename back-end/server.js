const dotenv = require('dotenv');
const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken'); // Import JWT

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Import the authentication middleware
const authenticateToken = require('./middleware/authMiddleware');

// Nodemailer Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error('Failed to connect to MongoDB', err));

// Route for sending messages
app.post('/api/send-message', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ success: false, message: 'All fields are required.' });
  }

  const mailOptions = {
    from: email,
    to: 'sunvoltsolar01@gmail.com',
    subject: `New Contact Us Message from ${name}`,
    text: `You have received a new message from ${name} (${email}):\n\n${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: true, message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ success: false, message: 'Failed to send message. Please try again later.' });
  }
});

// User Routes
app.use('/api/users', require('./routes/userRoutes')); // Include the user routes

// Example of a protected route
app.get('/api/protected', authenticateToken, (req, res) => {
  res.json({ message: 'This is a protected route', user: req.user });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
