// Simple test server to verify setup
const express = require('express');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ message: 'Test server is working!', status: 'ok' });
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'API test endpoint working!', timestamp: new Date().toISOString() });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`📡 Test it: http://localhost:${PORT}/api/test`);
});






