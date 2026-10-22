import express from 'express';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import handler from './generate.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Generate endpoint
app.post('/api/generate', async (req, res) => {
  await handler(req, res);
});

app.listen(PORT, () => {
  console.log(`✨ PlotTwist.ai backend running on http://localhost:${PORT}`);
});
