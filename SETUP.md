# PlotTwist.ai Setup Guide

## Prerequisites
- Node.js 18+ installed
- npm or yarn package manager
- A free Hugging Face account

## Local Development Setup

### 1. Get Your Hugging Face Token

1. Go to [huggingface.co/settings/tokens](https://huggingface.co/settings/tokens)
2. Create a new access token (read-only is fine)
3. Copy the token value

### 2. Install Dependencies

```bash
npm install
```

Required dependencies:
- `next` - Next.js framework
- `react` - UI library
- `tailwindcss` - Styling (if not already installed)

If Tailwind is missing, install it:
```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### 3. Create `.env.local`

Create a `.env.local` file in the project root (NOT in version control):

```env
HF_TOKEN=your_huggingface_api_token_here
```

Replace `your_huggingface_api_token_here` with the token you copied from Hugging Face.

### 4. Run Local Development Server

```bash
npm run dev
```

The site will be available at `http://localhost:3000`

### 5. Test the Application

1. Open http://localhost:3000 in your browser
2. Select a character type (Fruit or Human)
3. Enter a drama scenario (e.g., "A banana discovers their peel is turning brown. They must decide: embrace aging or seek a risky experimental treatment.")
4. Click "Generate Scene"
5. Wait 10-30 seconds for the AI to generate the image

## Deployment to Vercel

### 1. Push to GitHub
```bash
git init
git add .
git commit -m "Initial PlotTwist.ai commit"
git remote add origin https://github.com/YOUR_USERNAME/plottwist-ai.git
git push -u origin main
```

### 2. Deploy to Vercel

1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your GitHub repository
4. In "Environment Variables", add:
   - **Name:** `HF_TOKEN`
   - **Value:** Your Hugging Face API token
5. Click "Deploy"

That's it! Your site will be live within minutes.

## Important Notes

⚠️ **Security:**
- Never commit `.env.local` to version control
- Vercel automatically encrypts environment variables
- The `HF_TOKEN` is only used server-side in the API route

⚠️ **Hugging Face Serverless Inference:**
- Free tier includes rate limiting
- First request after inactivity may take 20-40 seconds (model cold start)
- Subsequent requests are faster (10-30 seconds)
- For unlimited usage, consider Hugging Face Pro or Inference Endpoints

## Troubleshooting

### "HF_TOKEN is not configured"
- Make sure `.env.local` exists in the project root
- Restart the dev server after creating/modifying `.env.local`
- Verify the token is valid at https://huggingface.co/settings/tokens

### "Failed to generate image"
- Check your Hugging Face token is still valid
- Verify you have internet connectivity
- Wait a moment and try again (may be rate limited)
- Check browser console (F12) for detailed error messages

### Slow generation on first request
- This is normal! Hugging Face Serverless Inference needs to load the model
- Subsequent requests will be faster
- To avoid cold starts, consider Hugging Face Inference Endpoints (paid)

## File Structure

```
├── app/
│   ├── api/
│   │   └── generate/
│   │       └── route.js          # API endpoint for image generation
│   ├── layout.js                  # Root layout
│   └── page.js                    # Main UI component
├── .env.local                      # Environment variables (NOT in git)
├── .env.local.example              # Template for .env.local
├── .gitignore                      # Git ignore file
├── next.config.js                  # Next.js configuration
├── tailwind.config.js              # Tailwind CSS config
├── postcss.config.js               # PostCSS config
└── package.json                    # Dependencies

```

## Next Steps

1. Customize the prompt engineering in `app/api/generate/route.js` line 32 for different styles
2. Add more character types to the dropdown in `app/page.js`
3. Add user authentication if desired
4. Implement image caching/storage
5. Add analytics to track usage

Enjoy creating drama! 🎬
