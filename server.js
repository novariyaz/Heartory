import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rateLimit from 'express-rate-limit';
import { GoogleGenAI } from '@google/genai';

// Load environment variables
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Configure Rate Limiting to protect the API Key
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 1 minute
    max: 5, // Limit each IP to 5 requests per windowMs
    message: { error: 'Too many heartbeats. Please wait a moment.' }
});

// Configure CORS to accept localhost AND production URLs
const allowedOrigins = [
    'http://localhost:5173',
    process.env.FRONTEND_URL // We will set this when deployed (e.g., https://heartory.vercel.app)
].filter(Boolean);

app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps or curl requests)
        // Or if the origin is in our allowed list
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());
app.use('/api', limiter); // Apply rate limiter to all API routes

const apiKey = process.env.GEMINI_API_KEY;
let ai = null;

if (apiKey) {
    ai = new GoogleGenAI({ apiKey });
} else {
    console.warn("⚠️ Warning: GEMINI_API_KEY is not set in the .env file.");
}

app.post('/api/emotion', async (req, res) => {
    const { message, recipient } = req.body;

    if (!message || !recipient) {
        return res.status(400).json({ error: 'Message and recipient are required.' });
    }

    if (!ai) {
        return res.status(500).json({ error: 'Gemini API is not configured on the server.' });
    }

    const prompt = `You are an empathetic, emotionally intelligent assistant reading a private, unsent message.
Your job is to identify the core emotion and provide a deeply empathetic, poetic insight (2-3 sentences max) acknowledging their feelings.
Return ONLY a strictly valid JSON object in this format:
{
  "emotion": "Short evocative descriptor (e.g. Nostalgic Melancholy)",
  "insight": "The empathetic response"
}

This message is addressed to: ${recipient}
Message: "${message}"`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: 'application/json',
                temperature: 0.7
            }
        });

        let parsed;
        try {
            parsed = JSON.parse(response.text);
        } catch (parseError) {
            console.error("JSON Parse Error:", parseError, "Raw response:", response.text);
            return res.status(500).json({ error: 'Received an unexpected response. Please try again.' });
        }
        res.json(parsed);
    } catch (error) {
        console.error("Gemini API Error:", error);
        res.status(500).json({ error: 'Failed to process emotional insight.' });
    }
});

app.listen(port, () => {
    console.log(`Backend server running at http://localhost:${port}`);
});
