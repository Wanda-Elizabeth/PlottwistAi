export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { characterType, dramaStory } = req.body;

    if (!characterType || !dramaStory) {
      return res.status(400).json({
        error: 'Missing required fields: characterType and dramaStory',
      });
    }

    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      console.error('HF_TOKEN environment variable is not set');
      return res.status(500).json({
        error: 'Server configuration error: HF_TOKEN not configured',
      });
    }

    const masterPrompt = `A 3D animated reality TV drama scene. A glossy anthropomorphic ${characterType}. Scenario: ${dramaStory}. Pixar style, highly detailed 3D render, vibrant cinematic lighting, vertical 9:16 aspect ratio.`;

    const response = await fetch(
      'https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell',
      {
        headers: { Authorization: `Bearer ${hfToken}` },
        method: 'POST',
        body: JSON.stringify({ inputs: masterPrompt }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error('Hugging Face API error:', response.status, errorData);
      return res.status(502).json({
        error: `Hugging Face API returned status ${response.status}`,
      });
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString('base64');
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    return res.status(200).json({
      success: true,
      image: dataUri,
      prompt: masterPrompt,
    });
  } catch (error) {
    console.error('API Error:', error.message);
    return res.status(500).json({
      error: 'Failed to generate image. Please try again.',
      details: error.message,
    });
  }
}
