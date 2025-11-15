const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');

const SensorData = require('../models/SensorData');
const User = require('../models/User');

// POST /api/sensor/data (protected)
router.post('/data', auth, async (req, res) => {
  try {
    const { moisture, temperature, ph } = req.body;
    const data = new SensorData({ user: req.user.id, moisture, temperature, ph });
    await data.save();
    res.json(data);
  } catch(err) {
    console.error(err); res.status(500).send('Server error');
  }
});

// GET /api/sensor/latest (protected) - for current user
router.get('/latest', auth, async (req, res) => {
  try {
    const data = await SensorData.find({ user: req.user.id }).sort({ createdAt: -1 }).limit(50);
    res.json(data);
  } catch(err) { console.error(err); res.status(500).send('Server error'); }
});

// GET /api/sensor/all (admin)
router.get('/all', auth, async (req, res) => {
  try {
    if(req.user.role !== 'admin') return res.status(403).json({ msg:'Access denied' });
    const data = await SensorData.find().sort({ createdAt: -1 }).populate('user','name email');
    res.json(data);
  } catch(err) { console.error(err); res.status(500).send('Server error'); }
});

module.exports = router;
