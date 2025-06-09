// server.js
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();
const HUGGINGFACE_API_KEY = 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;

app.use(cors());
app.use(express.json());

app.post('/api/generate-poster', async (req, res) => {
  try {
    const response = await axios.post(
      'https://huggingface.co/stable-diffusion-v1-5/stable-diffusion-v1-5',
      req.body,
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HUGGINGFACE_API_KEY}`
        },
        responseType: 'arraybuffer'
      }
    );
    
    res.set('Content-Type', 'image/png');
    res.send(response.data);
  } catch (error) {
    console.error('Error calling Hugging Face API:', error);
    res.status(500).send('Error generating image');
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));