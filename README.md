<p align="center">
  <img src="public/heartory.svg" alt="Heartory Logo" width="80" />
</p>

<h1 align="center">Heartory</h1>
<p align="center"><em>Words left unsaid, finally heard.</em></p>

<p align="center">
  <a href="https://heartory-seven.vercel.app">🌐 Live Demo</a> •
  <a href="#features">Features</a> •
  <a href="#tech-stack">Tech Stack</a> •
  <a href="#getting-started">Getting Started</a>
</p>

---

A safe, anonymous space to release the messages you never sent. Type your unsent words, let them go into the void, and receive an empathetic, AI-generated emotional insight in return. Nothing is saved. Nothing is tracked. Just release and heal.

## Features

- 💬 **Unsent Message Release** — Write the words you never said to someone, addressed by name
- ✨ **AI Emotional Insight** — Gemini 2.5 Flash analyzes the emotion and responds with a poetic, empathetic reflection
- 🖼️ **Save Keepsake** — Download your insight as a beautiful image (PNG)
- 🔒 **Fully Anonymous** — No accounts, no data storage, no cookies. Messages are processed and immediately forgotten
- 🎨 **Premium UI** — Glassmorphic cards, animated backgrounds (DarkVeil shader), spotlight tracking, Playfair Display typography
- 📱 **PWA Ready** — Installable on mobile devices
- ⌨️ **Keyboard Shortcuts** — Ctrl+Enter to submit
- 🔊 **Sound & Haptics** — Subtle audio and vibration feedback on release

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 19, Vite 7, Tailwind CSS 4 |
| **Animation** | Framer Motion, custom WebGL shaders (DarkVeil) |
| **AI** | Google Gemini 2.5 Flash via `@google/genai` |
| **Backend** | Vercel Serverless Functions (Express for local dev) |
| **Deployment** | Vercel (auto-deploy from GitHub) |
| **PWA** | vite-plugin-pwa |

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18+
- A [Google Gemini API Key](https://aistudio.google.com/apikey)

### Installation

```bash
# Clone the repo
git clone https://github.com/novariyaz/Heartory.git
cd Heartory

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Add your Gemini API key to .env
```

### Environment Variables

Create a `.env` file in the root:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

### Development

```bash
# Run both frontend (Vite) and backend (Express) concurrently
npm run dev
```

- **Frontend**: http://localhost:5173
- **Backend API**: http://localhost:3000

### Production Build

```bash
npm run build
npm run preview
```

## Project Structure

```
Heartory/
├── api/
│   └── emotion.js          # Vercel serverless function (production)
├── public/
│   ├── audio/release.mp3   # Release sound effect
│   ├── heartory.svg        # Logo
│   └── icon-*.png          # PWA icons
├── src/
│   ├── components/
│   │   ├── CursorAnimation.jsx
│   │   ├── DarkVeil.jsx       # WebGL animated background
│   │   ├── FluidGlassButton.jsx
│   │   ├── SpotlightCard.jsx  # Mouse-tracking spotlight card
│   │   └── VariableProximity.jsx
│   ├── lib/
│   │   └── gemini.js       # Frontend API client
│   ├── App.jsx             # Main application
│   ├── index.css           # Global styles + Tailwind
│   └── main.jsx            # Entry point
├── server.js               # Express backend (local development)
├── vercel.json             # Vercel deployment config
└── package.json
```

## Deployment

The app auto-deploys to [Vercel](https://vercel.com) on every push to `main`.

To deploy manually:
1. Push to GitHub
2. Import the repo on [vercel.com/new](https://vercel.com/new)
3. Add `GEMINI_API_KEY` as an environment variable
4. Deploy

## Privacy

Heartory is designed with privacy at its core:
- **No accounts** — no sign-up required
- **No storage** — messages are processed in-memory and never persisted
- **No tracking** — no analytics, no cookies, no fingerprinting
- **Ephemeral** — everything is gone the moment you leave

## License

MIT © [novariyaz](https://github.com/novariyaz)
