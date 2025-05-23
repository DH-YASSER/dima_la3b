const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); // Required here if not using userSchema.methods.comparePassword directly for some reason, but User model method is preferred.

// Function to generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'yourFallbackSecretKey', { // Fallback secret for now
    expiresIn: '30d', // Token expires in 30 days
  });
};

// Register User
exports.registerUser = async (req, res) => {
  const { username, email, password, fullName } = req.body; // Added fullName as per DimaLa3bAuth form

  try {
    // Check if user already exists
    let user = await User.findOne({ $or: [{ email }, { username }] });
    if (user) {
      let message = '';
      if (user.email === email) message = 'User with this email already exists.';
      else message = 'User with this username already exists.';
      return res.status(400).json({ message });
    }

    // Create new user instance (password will be hashed by pre-save hook in User.js)
    user = new User({
      username,
      email,
      password,
      // fullName, // If you add fullName to your User model
    });

    await user.save();

    // Generate token
    const token = generateToken(user._id);

    res.status(201).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // fullName: user.fullName
      },
      message: 'User registered successfully!'
    });

  } catch (error) {
    console.error('Registration Error:', error.message); // Log the actual error
    // Check for Mongoose validation errors
    if (error.name === 'ValidationError') {
        const messages = Object.values(error.errors).map(val => val.message);
        return res.status(400).json({ message: messages.join(' ') });
    }
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body; // DimaLa3bAuth uses email (or username) for login

  try {
    // Check if user exists (allow login with email or username)
    // The DimaLa3bAuth form has "البريد الإلكتروني أو اسم المستخدم" (Email or username)
    // So we should allow login with either.
    const user = await User.findOne({ 
        $or: [
            { email: email.toLowerCase() }, 
            { username: email.toLowerCase() } // Assuming 'email' field from form can contain username
        ]
    });

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials (user not found).' });
    }

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials (password incorrect).' });
    }

    // User matched, create JWT
    const token = generateToken(user._id);

    res.status(200).json({
      token,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        // fullName: user.fullName // if you add fullName to your User model
      },
      message: 'Login successful!'
    });

  } catch (error) {
    console.error('Login Error:', error);
    res.status(500).json({ message: 'Server error during login.' });
  }
};
