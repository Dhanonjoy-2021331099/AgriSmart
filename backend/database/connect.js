const mongoose = require('mongoose');

// Cache connection for serverless (reuse existing connection)
let cachedConnection = null;

const connectDB = async () => {
  try {
    // Reuse existing connection if available (important for serverless)
    if (cachedConnection && mongoose.connection.readyState === 1) {
      return cachedConnection;
    }

    // ALWAYS use DB_USER and DB_PASS (same as MongoClient which works)
    if (!process.env.DB_USER || !process.env.DB_PASS) {
      console.error('❌ DB_USER and DB_PASS must be set in environment variables');
      throw new Error('Database credentials not configured');
    }

    // Use the EXACT same format as MongoClient
    const mongoURI = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mbp6mif.mongodb.net/?retryWrites=true&w=majority`;

    console.log('🔄 Attempting mongoose connection...');
    
    // Connect without database name in URI, then specify it in options
    const connection = await mongoose.connect(mongoURI, {
      serverSelectionTimeoutMS: 10000,
      dbName: 'agrismartDB',
      // Important for serverless: don't buffer commands
      bufferCommands: false,
      bufferMaxEntries: 0,
    });
    
    cachedConnection = connection;
    console.log('✅ MongoDB connected successfully (mongoose)');
    return connection;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    console.error('💡 DB_USER:', process.env.DB_USER ? 'Set' : 'Not set');
    console.error('💡 DB_PASS:', process.env.DB_PASS ? 'Set' : 'Not set');
    // Never exit process in serverless - let routes handle errors
    throw err;
  }
};

module.exports = connectDB;
