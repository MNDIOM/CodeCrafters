const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

// POST route to handle contact form submission
router.post('/', async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  // Setup Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // Email options
  let mailOptions = {
    from: email,
    to: 'sunvoltsolar01@gmail.com',
    subject: `Contact Form Submission from ${name}`,
    text: message,
  };

  // Send email
  try {
    await transporter.sendMail(mailOptions);
    res.status(200).json({ success: 'Message sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
