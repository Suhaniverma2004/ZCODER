const express = require('express');
const cors = require('cors');
const axios = require('axios');
require('dotenv').config(); // This will look for a .env file in the 'backend' folder

const app = express();
app.use(cors());
app.use(express.json());

// Using the JDoodle API
const languageConfig = {
  javascript: { lang: 'nodejs', versionIndex: '4' },
  python: { lang: 'python3', versionIndex: '4' },
  cpp: { lang: 'cpp17', versionIndex: '1' },
};

app.post('/api/execute', async (req, res) => {
  const { language, code } = req.body;
  const config = languageConfig[language];

  if (!config) {
    return res.status(400).json({ error: 'Unsupported language.' });
  }

  const payload = {
    clientId: process.env.JDOODLE_CLIENT_ID,
    clientSecret: process.env.JDOODLE_CLIENT_SECRET,
    script: code,
    language: config.lang,
    versionIndex: config.versionIndex,
  };

  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', payload);
    res.json({ output: response.data.output });
  } catch (error) {
    console.error("Error calling execution API:", error.response ? error.response.data : error.message);
    res.status(500).json({ error: 'An error occurred while executing the code.' });
  }
});

// --- THIS IS THE FIX ---
// This server is now correctly assigned to port 5000.
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Code Execution Server is running on port ${PORT}`);
});