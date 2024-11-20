// backend/routes/auth.js

const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const OTP = require('../models/OTP');
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
require('dotenv').config();

const { sendOTP } = require('../controllers/authController');

// Route to send OTP
router.post('/send-otp', sendOTP);


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  const admin = await Admin.findOne({ email });

  if (admin && await bcrypt.compare(password, admin.password)) {
    const otp = Math.floor(1000 + Math.random() * 9000).toString(); // Generate 4-digit OTP
    const otpDoc = new OTP({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000),
    });
    await otpDoc.save();

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Your OTP Code',
      html: `
        <div style="font-family: Arial, sans-serif; text-align: center;">
          <h2>OTP Verification</h2>
          <p>Dear user,</p>
          <p>Your OTP code is:</p>
          <h1 style="background: #f4f4f4; display: inline-block; padding: 10px; border-radius: 5px;">${otp}</h1>
          <p>Please use this code to complete your login. This code will expire in 10 minutes.</p>
          <p>If you did not request this code, please ignore this email.</p>
          <br>
          <p>Thank you,</p>
          <p>Your Company Name</p>
        </div>
      `,
    });
console.log(otp);
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
});

router.post('/verify-otp', async (req, res) => {
  const { otp } = req.body;
  const otpDoc = await OTP.findOne({ otp, expiresAt: { $gt: new Date() } });

  if (otpDoc) {
    res.json({ success: true });
  } else {
    res.status(401).json({ success: false, message: 'Invalid or expired OTP' });
  }
});

module.exports = router;
