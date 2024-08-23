const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Route to handle contact form submissions
router.post('/contact', async (req, res) => {
  const { name, email, message } = req.body;

  // Validate the input fields
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Configure the email transporter
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Define the email options
    let mailOptions = {
      from: email,
      to: 'sunvoltsolar01@gmail.com',
      subject: `Contact Form Submission from ${name}`,
      text: message,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

    // Send a response back to the client
    res.status(200).json({ message: 'Your message has been sent successfully!' });
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send your message. Please try again later.' });
  }
});

module.exports = router;
