import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { extractTransactionData } from '../services/geminiService';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables from .env.local
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'API server is running' });
});

// Transaction extraction endpoint
app.post('/api/extract', async (req, res) => {
  try {
    const { text } = req.body;

    if (!text || typeof text !== 'string') {
      return res.status(400).json({ 
        error: 'Invalid request. "text" field is required and must be a string.' 
      });
    }

    const transactions = await extractTransactionData(text);
    
    res.json({ transactions });
  } catch (error: any) {
    console.error('API Error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to extract transaction data' 
    });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 API server running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/health`);
});
