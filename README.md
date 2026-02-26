<div align="center">

<!-- Animated Header -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1,8b5cf6,a855f7&height=200&section=header&text=💜%20Heartory&fontSize=70&fontColor=ffffff&animation=fadeIn&fontAlignY=35&desc=Words%20left%20unsaid,%20finally%20heard.&descSize=20&descAlignY=55&descColor=c4b5fd" width="100%" />

<!-- Animated Typing -->
<a href="https://heartory-seven.vercel.app">
  <img src="https://readme-typing-svg.demolab.com?font=Inter&weight=300&size=24&duration=4000&pause=1500&color=A78BFA&center=true&vCenter=true&random=false&width=500&lines=A+safe+space+for+unsent+words;Release+what+you+never+said;AI-powered+emotional+insight;Anonymous.+Ephemeral.+Healing." alt="Typing SVG" />
</a>

<br/>

<!-- Badges -->
[![Live Demo](https://img.shields.io/badge/🌐_Live_Demo-heartory--seven.vercel.app-6366f1?style=for-the-badge&labelColor=0f0a1a)](https://heartory-seven.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-Repo-181717?style=for-the-badge&logo=github&labelColor=0f0a1a)](https://github.com/novariyaz/Heartory)

<br/>

[![React](https://img.shields.io/badge/React_19-20232A?style=flat-square&logo=react&logoColor=61DAFB)](https://react.dev)
[![Vite](https://img.shields.io/badge/Vite_7-646CFF?style=flat-square&logo=vite&logoColor=white)](https://vite.dev)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_4-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Gemini](https://img.shields.io/badge/Gemini_2.5_Flash-4285F4?style=flat-square&logo=google&logoColor=white)](https://ai.google.dev)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)](https://vercel.com)
[![PWA](https://img.shields.io/badge/PWA-5A0FC8?style=flat-square&logo=pwa&logoColor=white)](https://web.dev/progressive-web-apps/)

</div>

---

<br/>

<div align="center">
  <h3>✦ What is Heartory? ✦</h3>
  <p><em>Type the message you never sent. Let it go. Receive an empathetic, AI-generated reflection.<br/>Nothing is saved. Nothing is tracked. Just release and heal.</em></p>
</div>

<br/>

## ✨ Features

<table>
<tr>
<td width="50%">

**💬 Unsent Message Release**
Write the words you never said, addressed to someone by name

**✨ AI Emotional Insight**
Gemini 2.5 Flash responds with a poetic, empathetic reflection

**🖼️ Save Keepsake**
Download your insight as a beautiful PNG image

**🔒 Fully Anonymous**
No accounts, no storage, no cookies — completely ephemeral

</td>
<td width="50%">

**🎨 Premium UI**
Glassmorphic cards, WebGL shaders, spotlight tracking

**📱 PWA Ready**
Installable on mobile devices for a native-like experience

**⌨️ Keyboard Shortcuts**
`Ctrl+Enter` to submit your message instantly

**🔊 Sound & Haptics**
Subtle audio and vibration feedback on release

</td>
</tr>
</table>

<br/>

## 🛠️ Tech Stack

<div align="center">

```
┌─────────────────────────────────────────────────┐
│                   HEARTORY                       │
├──────────────┬──────────────────────────────────┤
│  Frontend    │  React 19 · Vite 7 · Tailwind 4 │
│  Animation   │  Framer Motion · WebGL Shaders   │
│  Typography  │  Inter · Playfair Display        │
│  AI Engine   │  Google Gemini 2.5 Flash         │
│  Backend     │  Vercel Serverless Functions      │
│  Deployment  │  Vercel (auto-deploy from GitHub) │
│  PWA         │  vite-plugin-pwa                  │
└──────────────┴──────────────────────────────────┘
```

</div>

<br/>

## 🚀 Getting Started

<details>
<summary><b>📋 Prerequisites</b></summary>
<br/>

- [Node.js](https://nodejs.org/) 18+
- A [Google Gemini API Key](https://aistudio.google.com/apikey)

</details>

<details>
<summary><b>⚡ Quick Setup</b></summary>
<br/>

```bash
# Clone the repo
git clone https://github.com/novariyaz/Heartory.git
cd Heartory

# Install dependencies
npm install

# Create your environment file
cp .env.example .env
# → Add your GEMINI_API_KEY to .env
```

</details>

<details>
<summary><b>🔑 Environment Variables</b></summary>
<br/>

Create a `.env` file in the root directory:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

</details>

<details open>
<summary><b>▶️ Run Locally</b></summary>
<br/>

```bash
# Start both frontend + backend
npm run dev
```

| Service | URL |
|---------|-----|
| 🖥️ Frontend | http://localhost:5173 |
| ⚡ Backend API | http://localhost:3000 |

</details>

<br/>

## 📁 Project Structure

```
Heartory/
├── 🔌 api/
│   └── emotion.js              # Vercel serverless function
├── 🎨 public/
│   ├── audio/release.mp3       # Release sound effect
│   ├── heartory.svg            # Logo
│   └── icon-*.png              # PWA icons
├── ⚛️ src/
│   ├── components/
│   │   ├── CursorAnimation.jsx # Mouse-follow animation
│   │   ├── DarkVeil.jsx        # WebGL animated background
│   │   ├── FluidGlassButton.jsx# Shimmer glass button
│   │   ├── SpotlightCard.jsx   # Mouse-tracking spotlight
│   │   └── VariableProximity.jsx
│   ├── lib/
│   │   └── gemini.js           # API client
│   ├── App.jsx                 # Main application
│   ├── index.css               # Global styles
│   └── main.jsx                # Entry point
├── server.js                   # Express (local dev)
├── vercel.json                 # Deployment config
└── package.json
```

<br/>

## 🌐 Deployment

> Every push to `main` auto-deploys to Vercel ⚡

**Manual deploy:**

1. Push your code to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add `GEMINI_API_KEY` as an environment variable
4. Hit **Deploy** 🚀

<br/>

## 🔒 Privacy

<div align="center">

| | |
|---|---|
| 🚫 No accounts | No sign-up required |
| 🗑️ No storage | Messages are never persisted |
| 🍪 No tracking | No analytics, cookies, or fingerprinting |
| 💨 Ephemeral | Everything vanishes when you leave |

</div>

<br/>

## 📄 License

```
MIT © novariyaz
```

<br/>

<div align="center">

<!-- Animated Footer -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=6366f1,8b5cf6,a855f7&height=120&section=footer" width="100%" />

<br/>

*Whispered into the void. Anonymously processed, never saved, and gone the moment you leave.*

<br/>

**[💜 Try Heartory →](https://heartory-seven.vercel.app)**

</div>
