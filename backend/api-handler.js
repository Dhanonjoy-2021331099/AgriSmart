// Vercel Serverless Function Handler
// This wrapper ensures ALL responses are JSON, even on errors

const app = require('./server');

// Wrap Express app to guarantee JSON responses
module.exports = async (req, res) => {
  // Set JSON header immediately
  res.setHeader('Content-Type', 'application/json');
  
  // Store original methods
  const originalJson = res.json.bind(res);
  const originalSend = res.send.bind(res);
  const originalEnd = res.end.bind(res);
  
  // Override res.json to ensure Content-Type
  res.json = function(data) {
    this.setHeader('Content-Type', 'application/json');
    return originalJson(data);
  };
  
  // Override res.send to ensure JSON
  res.send = function(data) {
    this.setHeader('Content-Type', 'application/json');
    // If data is not JSON, convert it
    if (typeof data === 'string') {
      return originalJson({ message: data });
    }
    return originalJson(data);
  };
  
  // Handle the request
  try {
    await new Promise((resolve, reject) => {
      // Handle request
      app(req, res);
      
      // Monitor response completion
      const checkComplete = () => {
        if (res.headersSent) {
          resolve();
        }
      };
      
      // Check periodically
      const interval = setInterval(() => {
        if (res.headersSent) {
          clearInterval(interval);
          resolve();
        }
      }, 10);
      
      // Timeout after 25 seconds (before Vercel's 30s limit)
      setTimeout(() => {
        clearInterval(interval);
        if (!res.headersSent) {
          res.status(500).json({
            error: 'Request timeout',
            message: 'The request took too long to process'
          });
        }
        resolve();
      }, 25000);
      
      // Handle errors
      res.on('error', (err) => {
        clearInterval(interval);
        reject(err);
      });
    });
  } catch (error) {
    console.error('Handler error:', error);
    
    // Ensure JSON error response
    if (!res.headersSent) {
      res.setHeader('Content-Type', 'application/json');
      res.status(500).json({
        error: 'Internal server error',
        message: error.message || 'An unexpected error occurred'
      });
    }
  }
};






