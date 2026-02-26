import { GoogleGenAI } from '@google/genai';

// Simple in-memory rate limiting
const rateLimitMap = new Map();
const RATE_LIMIT_WINDOW = 60 * 1000; // 1 minute
const RATE_LIMIT_MAX = 5;

function isRateLimited(ip) {
    const now = Date.now();
    const record = rateLimitMap.get(ip);
    if (!record || now - record.start > RATE_LIMIT_WINDOW) {
        rateLimitMap.set(ip, { start: now, count: 1 });
        return false;
    }
    record.count++;
    if (record.count > RATE_LIMIT_MAX) return true;
    return false;
}

export default async function handler(req, res) {
    // Only allow POST
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    // CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    // Rate limiting
    const ip = req.headers['x-forwarded-for'] || req.headers['x-real-ip'] || 'unknown';
    if (isRateLimited(ip)) {
        return res.status(429).json({ error: 'Too many heartbeats. Please wait a moment.' });
    }

    const { message, recipient } = req.body;

    if (!message || !recipient) {
        return res.status(400).json({ error: 'Message and recipient are required.' });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        return res.status(500).json({ error: 'Gemini API is not configured on the server.' });
    }

    const ai = new GoogleGenAI({ apiKey });

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
            console.error("JSON Parse Error:", parseError, "Raw:", response.text);
            return res.status(500).json({ error: 'Received an unexpected response. Please try again.' });
        }

        return res.status(200).json(parsed);
    } catch (error) {
        console.error("Gemini API Error:", error);
        return res.status(500).json({ error: 'Failed to process emotional insight.' });
    }
}
