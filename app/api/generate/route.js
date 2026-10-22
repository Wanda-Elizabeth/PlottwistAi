export async function POST(request) {
  try {
    const { characterType, dramaStory } = await request.json();

    if (!characterType || !dramaStory) {
      return new Response(
        JSON.stringify({
          error: "Missing required fields: characterType and dramaStory",
        }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const hfToken = process.env.HF_TOKEN;
    if (!hfToken) {
      console.error("HF_TOKEN environment variable is not set");
      return new Response(
        JSON.stringify({
          error: "Server configuration error: HF_TOKEN not configured",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
      );
    }

    const masterPrompt = `A 3D animated reality TV drama scene. A glossy anthropomorphic ${characterType}. Scenario: ${dramaStory}. Pixar style, highly detailed 3D render, vibrant cinematic lighting, vertical 9:16 aspect ratio.`;

    const response = await fetch(
      "https://api-inference.huggingface.co/models/black-forest-labs/FLUX.1-schnell",
      {
        headers: { Authorization: `Bearer ${hfToken}` },
        method: "POST",
        body: JSON.stringify({ inputs: masterPrompt }),
      }
    );

    if (!response.ok) {
      const errorData = await response.text();
      console.error(
        "Hugging Face API error:",
        response.status,
        errorData
      );
      return new Response(
        JSON.stringify({
          error: `Hugging Face API returned status ${response.status}`,
        }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    const buffer = await response.arrayBuffer();
    const base64Image = Buffer.from(buffer).toString("base64");
    const dataUri = `data:image/jpeg;base64,${base64Image}`;

    return new Response(
      JSON.stringify({
        success: true,
        image: dataUri,
        prompt: masterPrompt,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("API Error:", error.message);
    return new Response(
      JSON.stringify({
        error: "Failed to generate image. Please try again.",
        details: error.message,
      }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
