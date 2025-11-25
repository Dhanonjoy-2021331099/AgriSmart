const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // ALWAYS use DB_USER and DB_PASS (same as MongoClient which works)
    // Ignore MONGO_URI from .env if it exists, as it might have wrong credentials
    if (!process.env.DB_USER || !process.env.DB_PASS) {
      console.error('❌ DB_USER and DB_PASS must be set in .env file');
      return;
    }

    // Use the EXACT same format as MongoClient (no URL encoding needed if MongoClient works)
    const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbp6mif.mongodb.net/?retryWrites=true&w=majority`;

    console.log('🔄 Attempting mongoose connection (using same credentials as MongoClient)...');
    // Connect without database name in URI, then specify it in options (like MongoClient does)
    await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 15000,
      dbName: 'agrismartDB', // Specify database name here, not in URI
    });
    console.log('✅ MongoDB connected successfully (mongoose)');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('💡 DB_USER:', process.env.DB_USER ? 'Set' : 'Not set');
    console.error('💡 DB_PASS:', process.env.DB_PASS ? 'Set' : 'Not set');
    console.error('💡 Using same credentials as MongoClient which works');
    // Don't exit in development, just log the error
    if (process.env.NODE_ENV === 'production') {
      process.exit(1);
    }
  }
};

module.exports = connectDB;
