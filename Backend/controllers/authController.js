const Admin = require('../models/Admin');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const speakeasy = require('speakeasy');
const nodemailer = require('nodemailer');
const OTP = require('../models/OTP');
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    res.json({ message: '2FA required', email: admin.email });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.verify2FA = async (req, res) => {
  const { email, code } = req.body;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: 'Invalid email or 2FA code' });
    }

    const verified = speakeasy.totp.verify({
      secret: admin.twoFactorSecret,
      encoding: 'base32',
      token: code,
    });

    if (!verified) {
      return res.status(400).json({ message: 'Invalid 2FA code' });
    }

    const token = jwt.sign({ id: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token, message: 'Login successful' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const secret = speakeasy.generateSecret({ length: 32 });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newAdmin = new Admin({
      email,
      password: hashedPassword,
      twoFactorSecret: secret.base32,
    });

    await newAdmin.save();

    const otpauthUrl = speakeasy.otpauthURL({
      secret: secret.base32,
      label: email,
      issuer: 'YourAppName',
      encoding: 'base32'
    });

    console.log("Generated OTPAuth URL:", otpauthUrl);

    res.status(201).json({ 
      message: 'Admin registered successfully', 
      otpauthUrl: otpauthUrl 
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.sendOTP = async (req, res) => {
  const { email } = req.body;

  try {
    // Generate OTP
    const otp = Math.floor(1000 + Math.random() * 9000).toString();

    // Save OTP to database (optional but recommended for verification)
    const otpDoc = new OTP({
      email,
      otp,
      expiresAt: new Date(Date.now() + 10 * 60 * 1000), // Expires in 10 minutes
    });
    await otpDoc.save();

    // Send OTP via email using nodemailer
    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
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
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending OTP:', error);
    res.status(500).json({ message: 'Failed to send OTP. Please try again.' });
  }
};
