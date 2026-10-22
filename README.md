# PlotTwist.ai

Free open-source AI drama generator. Create stunning 3D Pixar-style scenes with AI, powered by [Hugging Face FLUX.1-schnell](https://huggingface.co/black-forest-labs/FLUX.1-schnell).

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- npm or pnpm

### 1. Get Your Hugging Face Token

1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Create a new **Read** access token
3. Copy the token

### 2. Install & Setup

```bash
# Install dependencies
npm install

# Create .env.local with your Hugging Face token
cp .env.local.example .env.local
# Edit .env.local and add your token:
# HF_TOKEN=hf_your_actual_token_here
```

### 3. Run Locally

```bash
# Start both frontend (Vite) and backend (Express) in parallel
npm run dev:all
```

Frontend: http://localhost:5173
Backend: http://localhost:3001

Or run them separately:
```bash
npm run dev          # Frontend only (Vite)
npm run dev:server   # Backend only (Express)
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel

#### Option 1: Using Vercel CLI
```bash
npm install -g vercel
vercel
```

#### Option 2: Using GitHub
1. Push your repo to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "Add New..." → "Project"
4. Import your GitHub repository
5. Under "Environment Variables", add:
   - **Name:** `HF_TOKEN`
   - **Value:** Your Hugging Face token
6. Click "Deploy"

Vercel will automatically:
- Build your Vite frontend
- Set up your Express backend as a serverless function
- Deploy both globally

Your site will be live at: `https://plottwist-ai.vercel.app`

## 🏗️ Project Structure

```
plottwist-ai/
├── src/
│   ├── App.tsx              # Main React component
│   ├── index.css            # Styles
│   └── main.tsx             # Entry point
├── api/
│   ├── generate.js          # Hugging Face API handler (Vercel function)
│   └── server.js            # Express dev server
├── vite.config.ts           # Vite configuration
├── .env.local               # Environment variables (git ignored)
├── .env.local.example       # Template for .env.local
└── package.json
```

## 🎬 How It Works

1. **User Input**: Select character type (Fruit/Human) and describe the drama
2. **Frontend**: Sends request to `/api/generate`
3. **Backend**: Constructs AI prompt and calls Hugging Face FLUX.1-schnell
4. **Image Generation**: Hugging Face generates a 9:16 vertical 3D scene (10-30s)
5. **Display**: Image is Base64-encoded and displayed in the app
6. **Download**: User can download the generated image

## 🔐 Security

- `HF_TOKEN` is kept server-side only (never exposed to frontend)
- Environment variables are encrypted on Vercel
- No user data is stored

## ⚠️ Rate Limiting

Hugging Face Serverless Inference has rate limits:
- First request (cold start): 20-40 seconds
- Subsequent requests: 10-30 seconds
- Free tier has request limits

For unlimited usage, consider:
- [Hugging Face Inference Endpoints](https://huggingface.co/inference-endpoints) (paid)
- Running locally with GPU

## 📝 Environment Variables

```
HF_TOKEN=hf_xxxxxxxxxxxxxxxxxxxxxxxx
```

Obtain from: https://huggingface.co/settings/tokens

## 🛠️ Development

### Available Scripts

```bash
npm run dev          # Start Vite dev server (port 5173)
npm run dev:server   # Start Express backend (port 3001)
npm run dev:all      # Start both in parallel
npm run build        # Build for production
npm run preview      # Preview production build
```

### Technologies

- **Frontend**: React 19, Vite, Tailwind CSS, lucide-react
- **Backend**: Express.js, Node.js
- **AI**: Hugging Face FLUX.1-schnell
- **Hosting**: Vercel (free tier)

## 📄 License

Open source and free to use.

---

Made with 🎬 and ✨
