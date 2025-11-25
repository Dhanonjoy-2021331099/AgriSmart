const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

// POST /api/auth/register - Simple Registration
router.post('/register', async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    if(!name || !email || !password) {
      return res.status(400).json({ msg:'Please provide name, email and password' });
    }

    // Check if user already exists
    let user = await User.findOne({ email });
    if(user) return res.status(400).json({ msg:'User already exists with this email' });

    // Hash password
    const hashed = await bcrypt.hash(password, 10);
    
    // Create user
    user = new User({ 
      name, 
      email, 
      password: hashed, 
      phone: phone || '',
      role: role || 'farmer'
    });
    await user.save();

    // Generate token
    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key-change-in-production', { expiresIn: '7d' });
    
    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone,
        role: user.role,
        photoURL: user.photoURL || ''
      },
      msg: 'Registration successful'
    });
  } catch(err) {
    console.error('Registration Error:', err);
    if(err.code === 11000) {
      return res.status(400).json({ msg:'Email already registered' });
    }
    res.status(500).json({ msg:'Server error during registration' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    if(!email || !password) return res.status(400).json({ msg:'Provide email and password' });

    const user = await User.findOne({ email });
    if(!user) return res.status(400).json({ msg:'Invalid credentials' });

    if(!user.password) return res.status(400).json({ msg:'Please set a password or use Google sign-in' });

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({ msg:'Invalid credentials' });

    const payload = { user: { id:user.id, role:user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key-change-in-production', { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { 
        id:user.id, 
        name:user.name, 
        email:user.email, 
        phone:user.phone,
        role:user.role,
        photoURL: user.photoURL || ''
      } 
    });
  } catch(err) {
    console.error('Login Error:', err);
    res.status(500).json({ msg:'Server error' });
  }
});

// Google OAuth - Verify Google token and create/login user
// POST /api/auth/google
router.post('/google', async (req, res) => {
  try {
    const { googleId, email, name, photoURL } = req.body;
    if(!googleId || !email) return res.status(400).json({ msg:'Google ID and email required' });

    // Check if user exists with Google ID
    let user = await User.findOne({ googleId });
    
    if(!user) {
      // Check if user exists with email
      user = await User.findOne({ email });
      
      if(user) {
        // Link Google account to existing user
        user.googleId = googleId;
        user.googleEmail = email;
        if(!user.name || user.name === 'Pending Registration') user.name = name;
        if(photoURL) user.photoURL = photoURL;
      } else {
        // Create new user
        user = new User({
          name: name || 'User',
          email: email,
          googleId: googleId,
          googleEmail: email,
          photoURL: photoURL || '',
          password: '' // No password for Google users
        });
      }
    } else {
      // Update user info
      if(name) user.name = name;
      user.googleEmail = email;
      if(photoURL) user.photoURL = photoURL;
    }

    await user.save();

    const payload = { user: { id: user.id, role: user.role } };
    const token = jwt.sign(payload, process.env.JWT_SECRET || 'your-secret-key-change-in-production', { expiresIn: '7d' });

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        phone: user.phone,
        role: user.role,
        photoURL: user.photoURL
      } 
    });
  } catch(err) {
    console.error('Google Auth Error:', err);
    res.status(500).json({ msg:'Server error' });
  }
});

// Get all users (Admin only)
// GET /api/auth/users
router.get('/users', async (req, res) => {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if(!token) return res.status(401).json({ msg:'Unauthorized' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key-change-in-production');
    const adminUser = await User.findById(decoded.user.id);
    if(!adminUser || adminUser.role !== 'admin') {
      return res.status(403).json({ msg:'Access denied. Admin only.' });
    }

    const users = await User.find().select('-password').sort({ createdAt: -1 });
    res.json(users);
  } catch(err) {
    console.error('Get Users Error:', err);
    res.status(500).json({ msg:'Server error' });
  }
});

module.exports = router;
