const mongoose = require('mongoose');

const SensorDataSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  moisture: Number,
  temperature: Number,
  ph: Number,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', SensorDataSchema);
