// Alternative API handler for Vercel (if needed)
// This file can be used if the main server.js doesn't work properly

const app = require('./server');

// Wrapper to ensure all responses are JSON
module.exports = async (req, res) => {
  try {
    // Set JSON header
    res.setHeader('Content-Type', 'application/json');
    
    // Handle the request
    await app(req, res);
  } catch (error) {
    console.error('API handler error:', error);
    if (!res.headersSent) {
      res.status(500).json({
        error: 'Internal server error',
        message: error.message
      });
    }
  }
};


