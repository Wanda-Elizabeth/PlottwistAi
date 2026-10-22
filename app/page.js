'use client';

import { useState } from 'react';
import Image from 'next/image';

export default function Home() {
  const [characterType, setCharacterType] = useState('Fruit Character');
  const [dramaStory, setDramaStory] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedImage, setGeneratedImage] = useState(null);
  const [error, setError] = useState(null);

  const handleGenerate = async () => {
    if (!dramaStory.trim()) {
      setError('Please enter a drama scenario');
      return;
    }

    setLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          characterType,
          dramaStory,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate image');
      }

      setGeneratedImage(data.image);
      setError(null);
    } catch (err) {
      setError(err.message);
      setGeneratedImage(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <div className="max-w-7xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-2">
            PlotTwist.ai
          </h1>
          <p className="text-gray-300 text-lg">
            Create 3D Pixar-style drama scenes with AI
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Panel */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8">
            <h2 className="text-2xl font-bold text-white mb-6">Create Your Scene</h2>

            {/* Character Type Selector */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Character Type
              </label>
              <select
                value={characterType}
                onChange={(e) => setCharacterType(e.target.value)}
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent cursor-pointer"
              >
                <option value="Fruit Character">🍎 Fruit Character</option>
                <option value="Human Character">👤 Human Character</option>
              </select>
            </div>

            {/* Drama Story Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-3">
                Drama Scenario
              </label>
              <textarea
                value={dramaStory}
                onChange={(e) => setDramaStory(e.target.value)}
                placeholder="e.g., A dramatic betrayal at a fruit stand. The apple discovers their best friend banana is moving away. Tears, tension, and an unexpected plot twist."
                rows="8"
                className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
              />
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-900/30 border border-red-700 rounded-lg text-red-300 text-sm">
                {error}
              </div>
            )}

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={loading}
              className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-300 ${
                loading
                  ? 'bg-gray-600 cursor-not-allowed opacity-60'
                  : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 cursor-pointer'
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Generating 3D Scene...
                </span>
              ) : (
                'Generate Scene'
              )}
            </button>
          </div>

          {/* Output Panel */}
          <div className="bg-gray-800/50 backdrop-blur border border-gray-700 rounded-lg p-8 flex flex-col items-center justify-center">
            {generatedImage ? (
              <div className="w-full flex flex-col items-center">
                <h2 className="text-2xl font-bold text-white mb-6">Your Drama Scene</h2>
                <div className="relative w-full max-w-xs bg-gray-900 rounded-lg overflow-hidden shadow-2xl">
                  {/* 9:16 Aspect Ratio Container */}
                  <div className="aspect-video relative" style={{ aspectRatio: '9 / 16' }}>
                    <img
                      src={generatedImage}
                      alt="Generated drama scene"
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>
                </div>
                <button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = generatedImage;
                    link.download = `plottwist-${Date.now()}.jpg`;
                    link.click();
                  }}
                  className="mt-6 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg font-semibold transition-colors"
                >
                  Download Image
                </button>
              </div>
            ) : loading ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-4 border-purple-400 border-t-pink-400 rounded-full animate-spin" />
                <p className="text-gray-300 text-lg">Crafting your masterpiece...</p>
                <p className="text-gray-400 text-sm">This usually takes 10-30 seconds</p>
              </div>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">🎬</div>
                <h2 className="text-2xl font-bold text-white mb-2">Ready to Create?</h2>
                <p className="text-gray-400">
                  Fill in the character type and drama scenario to generate your 3D scene.
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-gray-400 text-sm">
          <p>
            Powered by{' '}
            <a
              href="https://huggingface.co"
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              Hugging Face FLUX.1-schnell
            </a>
            {' '}• Open Source • Free to Use
          </p>
        </div>
      </div>
    </main>
  );
}
