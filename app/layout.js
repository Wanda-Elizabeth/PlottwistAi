import { Metadata } from 'next';
import './globals.css';

export const metadata = {
  title: 'PlotTwist.ai - AI Drama Generator',
  description:
    'Create stunning 3D Pixar-style drama scenes with AI. Free, open-source, powered by Hugging Face FLUX.1-schnell.',
  keywords: 'AI, image generation, drama, 3D, Pixar, FLUX, Hugging Face',
  authors: [{ name: 'PlotTwist.ai' }],
  openGraph: {
    title: 'PlotTwist.ai - AI Drama Generator',
    description: 'Create stunning 3D Pixar-style drama scenes with AI.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
