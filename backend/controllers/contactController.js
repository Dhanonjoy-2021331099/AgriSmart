const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const ContactMessage = require('../models/ContactMessage');

// POST /api/contact
router.post('/', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    const cm = new ContactMessage({ name, email, message });
    await cm.save();
    res.json({ msg:'Message received' });
  } catch(err) { 
    console.error(err); 
    res.status(500).json({ error: 'Server error', message: err.message }); 
  }
});

// GET /api/contact (admin)
router.get('/', auth, async (req, res) => {
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ msg:'Access denied' });
    const msgs = await ContactMessage.find().sort({ createdAt:-1 });
    res.json(msgs);
  } catch(err) { 
    console.error(err); 
    res.status(500).json({ error: 'Server error', message: err.message }); 
  }
});

module.exports = router;
