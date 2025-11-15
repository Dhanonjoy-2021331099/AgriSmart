require('dotenv').config({ path: require('path').resolve(__dirname, '..', '.env') });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const SensorData = require('../models/SensorData');
const connectDB = require('../database/connect');

const run = async () => {
  await connectDB();
  try {
    const adminEmail = process.env.ADMIN_EMAIL || 'admin@smartagri.test';
    const adminPass = process.env.ADMIN_PASS || 'admin123';

    // remove existing
    await User.deleteMany({});
    await SensorData.deleteMany({});

    const admin = new User({
      name: 'Admin',
      email: adminEmail,
      password: await bcrypt.hash(adminPass, 10),
      role: 'admin'
    });
    await admin.save();

    const farmer = new User({
      name: 'Demo Farmer',
      email: 'farmer@smartagri.test',
      password: await bcrypt.hash('farmer123', 10),
      role: 'farmer'
    });
    await farmer.save();

    // create sample sensor data for farmer
    const samples = [];
    for(let i=0;i<30;i++){
      samples.push({
        user: farmer._id,
        moisture: Math.round(30 + Math.random()*50),
        temperature: Math.round(18 + Math.random()*12),
        ph: +(5 + Math.random()*3).toFixed(1),
        createdAt: new Date(Date.now() - ((30-i)*60*60*1000))
      });
    }
    await SensorData.insertMany(samples);

    console.log('Seed finished. Admin:', adminEmail, '/', adminPass, 'Farmer: farmer@smartagri.test / farmer123');
    process.exit(0);
  } catch(err) {
    console.error(err);
    process.exit(1);
  }
};

run();
