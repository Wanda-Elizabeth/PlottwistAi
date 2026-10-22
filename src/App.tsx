import { useState } from "react"
import {
  ArrowRight,
  Check,
  ChevronDown,
  Coins,
  Download,
  ImageIcon,
  LoaderCircle,
  Play,
  RotateCcw,
  Sparkles,
  UserRound,
  WandSparkles,
} from "lucide-react"

const previewImage =
  "https://images.unsplash.com/photo-1761991766193-6295578152bf?crop=entropy&cs=tinysrgb&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=86&w=900&h=1600"

export default function App() {
  const [character, setCharacter] = useState("fruit")
  const [story, setStory] = useState("")
  const [isGenerating, setIsGenerating] = useState(false)
  const [hasGenerated, setHasGenerated] = useState(false)
  const [generatedImage, setGeneratedImage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const generateScene = async () => {
    if (!story.trim() || isGenerating) return

    setIsGenerating(true)
    setError(null)

    try {
      const characterType = character === "fruit" ? "Fruit Character" : "Human Character"

      const response = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          characterType,
          dramaStory: story,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to generate image")
      }

      setGeneratedImage(data.image)
      setHasGenerated(true)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred")
      setHasGenerated(false)
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadImage = () => {
    if (!generatedImage) return
    const link = document.createElement("a")
    link.href = generatedImage
    link.download = `plottwist-${Date.now()}.jpg`
    link.click()
  }

  const tryAgain = () => {
    setGeneratedImage(null)
    setHasGenerated(false)
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#" aria-label="PlotTwist.ai home">
          <span className="brand-mark">
            <Play fill="currentColor" aria-hidden="true" />
          </span>
          <span>
            PlotTwist<span className="brand-accent">.ai</span>
          </span>
        </a>

        <nav className="nav-links" aria-label="Main navigation">
          <a href="#create">Create</a>
          <a href="#how-it-works">How it works</a>
          <a href="#examples">Examples</a>
        </nav>

        <div className="header-actions">
          <div className="credits-badge" title="Remaining generation credits">
            <Coins aria-hidden="true" />
            <span>
              <strong>5</strong> credits
            </span>
          </div>
          <button
            className="profile-button"
            type="button"
            aria-label="Open profile"
          >
            <UserRound aria-hidden="true" />
          </button>
        </div>
      </header>

      <main>
        <section className="hero" id="create">
          <div className="hero-copy">
            <div className="eyebrow">
              <span className="status-dot" />
              Free AI scene generator
              <span className="eyebrow-divider" />
              <span>No credit card</span>
            </div>
            <h1>
              Big drama.
              <br />
              <span>One tiny prompt.</span>
            </h1>
            <p className="hero-description">
              Turn any wild idea into a cinematic 3D vertical scene. Built for
              storytellers, made for the plot.
            </p>

            <div className="trust-row">
              <div className="trust-item">
                <span className="trust-icon">
                  <Check aria-hidden="true" />
                </span>
                Free forever
              </div>
              <div className="trust-item">
                <span className="trust-icon">
                  <Check aria-hidden="true" />
                </span>
                No sign-up
              </div>
              <div className="trust-item">
                <span className="trust-icon">
                  <Check aria-hidden="true" />
                </span>
                Open source
              </div>
            </div>
          </div>

          <div className="creator-grid">
            <div className="generator-panel">
              <div className="panel-heading">
                <div>
                  <span className="step-label">Scene studio</span>
                  <h2>Build your plot twist</h2>
                </div>
                <span className="model-badge">
                  <Sparkles aria-hidden="true" />
                  FLUX.1
                </span>
              </div>

              <div className="field-group">
                <div className="field-label-row">
                  <label htmlFor="character">Choose your star</label>
                  <span>01</span>
                </div>
                <div className="character-select-wrap">
                  <span className="character-select-icon" aria-hidden="true">
                    {character === "fruit" ? (
                      <span className="fruit-mark" />
                    ) : (
                      <UserRound />
                    )}
                  </span>
                  <select
                    id="character"
                    value={character}
                    onChange={(event) => setCharacter(event.target.value)}
                  >
                    <option value="fruit">Fruit Character</option>
                    <option value="human">Human Character</option>
                  </select>
                  <ChevronDown className="select-chevron" aria-hidden="true" />
                </div>
              </div>

              <div className="field-group story-field">
                <div className="field-label-row">
                  <label htmlFor="story">Write the drama</label>
                  <span>02</span>
                </div>
                <div className="textarea-wrap">
                  <textarea
                    id="story"
                    value={story}
                    onChange={(event) => setStory(event.target.value)}
                    placeholder="Describe the dramatic scenario happening (e.g., Caught cheating at the beach resort...)"
                    maxLength={400}
                  />
                  <div className="textarea-meta">
                    <span>Describe the scene, mood, and big moment.</span>
                    <span>{story.length}/400</span>
                  </div>
                </div>
              </div>

              {error && (
                <div className="error-message">
                  <span>⚠️</span>
                  {error}
                </div>
              )}

              <div className="format-row">
                <div>
                  <span className="format-label">Output format</span>
                  <button className="format-select" type="button">
                    <span className="vertical-frame" />
                    Vertical · 9:16
                    <ChevronDown aria-hidden="true" />
                  </button>
                </div>
                <div className="style-chip">
                  <span>Style</span>
                  <strong>3D cinematic</strong>
                </div>
              </div>

              <button
                className="generate-button"
                type="button"
                onClick={generateScene}
                disabled={!story.trim() || isGenerating}
              >
                {isGenerating ? (
                  <>
                    <LoaderCircle className="spin" aria-hidden="true" />
                    Generating 3D scene...
                  </>
                ) : (
                  <>
                    <WandSparkles aria-hidden="true" />
                    <span aria-hidden="true">🎬</span>
                    Action! / Generate Scene
                    <ArrowRight aria-hidden="true" />
                  </>
                )}
              </button>

              <p className="generation-note">
                <Sparkles aria-hidden="true" />
                Usually ready in under 30 seconds
              </p>
            </div>

            <div className="preview-column">
              <div className="preview-topbar">
                <div>
                  <span className="preview-kicker">Your scene</span>
                  <strong>
                    {hasGenerated ? "The Berry Betrayal" : "Creating magic"}
                  </strong>
                </div>
                <span className="aspect-badge">9:16</span>
              </div>

              <div
                className={`scene-card ${isGenerating ? "is-loading" : ""} ${
                  !hasGenerated && !isGenerating ? "is-empty" : ""
                }`}
              >
                <img
                  src={generatedImage || previewImage}
                  alt={generatedImage ? "Generated drama scene" : "A cinematic character in dramatic lighting"}
                />
                <div className="scene-gradient" />
                {!generatedImage && (
                  <div className="character-face" aria-hidden="true">
                    <span className="eye left" />
                    <span className="eye right" />
                    <span className="mouth" />
                  </div>
                )}

                {isGenerating && (
                  <div className="loading-overlay">
                    <span className="loading-orbit">
                      <Sparkles aria-hidden="true" />
                    </span>
                    <strong>Directing your scene</strong>
                    <span>Adding drama, light, and a little chaos...</span>
                  </div>
                )}

                {!isGenerating && !hasGenerated && (
                  <div className="empty-preview">
                    <span>
                      <ImageIcon aria-hidden="true" />
                    </span>
                    <strong>Your scene will appear here</strong>
                    <p>
                      Describe the drama, choose your star, then call action.
                    </p>
                  </div>
                )}

                {!isGenerating && hasGenerated && (
                  <>
                    <div className="scene-pill">
                      <span className="live-dot" />
                      AI generated
                    </div>
                    <div className="scene-caption">
                      <span>Episode 01</span>
                      <strong>When the spotlight turns sour</strong>
                    </div>
                  </>
                )}
              </div>

              <div
                className={`preview-actions ${!hasGenerated ? "disabled" : ""}`}
              >
                <button
                  type="button"
                  className="secondary-action"
                  disabled={!hasGenerated}
                  onClick={tryAgain}
                >
                  <RotateCcw aria-hidden="true" />
                  Try again
                </button>
                <button
                  type="button"
                  className="download-action"
                  disabled={!hasGenerated}
                  onClick={downloadImage}
                >
                  <Download aria-hidden="true" />
                  Download
                </button>
              </div>
              <p className="photo-credit">
                Preview image by Luan Fonseca on Unsplash
              </p>
            </div>
          </div>
        </section>

        <section className="proof-strip" id="how-it-works">
          <div className="proof-intro">
            <span className="proof-icon">
              <ImageIcon aria-hidden="true" />
            </span>
            <div>
              <strong>Your story, rendered.</strong>
              <span>From prompt to portrait in three simple steps.</span>
            </div>
          </div>
          <div className="proof-steps">
            <div>
              <span>01</span>Pick a character
            </div>
            <div>
              <span>02</span>Drop the drama
            </div>
            <div>
              <span>03</span>Share the twist
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
