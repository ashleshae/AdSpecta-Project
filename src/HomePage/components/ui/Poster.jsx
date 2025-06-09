import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../../Cart/CartContext";
import "./PosterDesigner.css";

const PosterDesigner = () => {
  const navigate = useNavigate();
  const { addToCart } = React.useContext(CartContext);
  const [prompt, setPrompt] = useState("");
  const [generatedImage, setGeneratedImage] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState("");
  const [selectedSize, setSelectedSize] = useState("medium");
  const downloadRef = useRef(null);
  
  // Example poster sizes and pricing
  const posterSizes = {
    small: { name: "Small (18\" x 24\")", price: 1200 },
    medium: { name: "Medium (24\" x 36\")", price: 2000 },
    large: { name: "Large (27\" x 40\")", price: 3500 }
  };

  // Generate image using Hugging Face API
  // In your PosterDesigner.jsx component
const generatePoster = async () => {
  if (!prompt.trim()) {
    setError("Please enter a description for your poster");
    return;
  }
  
  setIsGenerating(true);
  setError("");
  
  try {
    // Call your proxy server instead of Hugging Face directly
    const response = await fetch('/api/generate-poster', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        inputs: `Marketing poster for: ${prompt}. Professional, high quality, advertising design.`,
        parameters: {
          width: 512,
          height: 768,
          guidance_scale: 7.5,
          num_inference_steps: 50,
        }
      }),
    });
    
    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`);
    }
    
    const imageBlob = await response.blob();
    const imageUrl = URL.createObjectURL(imageBlob);
    setGeneratedImage(imageUrl);
    
  } catch (err) {
    console.error("Error generating poster:", err);
    setError("Failed to generate poster. Please try again later.");
  } finally {
    setIsGenerating(false);
  }
};
  // Add poster to cart and navigate to checkout
  const addPosterToCart = () => {
    if (!generatedImage) return;
    
    const selectedPoster = posterSizes[selectedSize];
    
    const posterItem = {
      id: `custom-poster-${Date.now()}`,
      name: `Custom AI Poster - ${selectedSize}`,
      type: "Custom Poster",
      city: "Custom Design",
      price: selectedPoster.price,
      image: generatedImage,
      description: prompt,
      quantity: 1
    };
    
    addToCart(posterItem);
    navigate("/checkout");
  };

  // Handle poster download
  const downloadPoster = () => {
    if (!generatedImage) return;
    
    // Trigger download by creating an anchor and clicking it
    const link = document.createElement('a');
    link.href = generatedImage;
    link.download = `adspecta-poster-${Date.now()}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="poster-designer-container">
      <h1>AI Poster Designer</h1>
      <p className="designer-intro">
        Describe your product or campaign, and our AI will generate a professional marketing poster.
      </p>
      
      <div className="designer-grid">
        <div className="designer-controls">
          <div className="form-group">
            <label htmlFor="prompt">Describe your poster</label>
            <textarea
              id="prompt"
              placeholder="Describe your product and the type of poster you want. For example: 'My product is a Titan watch. Please generate a poster for offline marketing around the city.'"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              rows={5}
              disabled={isGenerating}
            />
          </div>
          
          <div className="form-group">
            <label>Select Poster Size</label>
            <div className="size-options">
              {Object.entries(posterSizes).map(([key, size]) => (
                <div 
                  key={key}
                  className={`size-option ${selectedSize === key ? 'selected' : ''}`}
                  onClick={() => setSelectedSize(key)}
                >
                  <div className="size-name">{size.name}</div>
                  <div className="size-price">₹{size.price.toLocaleString('en-IN')}</div>
                </div>
              ))}
            </div>
          </div>
          
          <button 
            className="generate-btn" 
            onClick={generatePoster}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? "Generating..." : "Generate Poster"}
          </button>
          
          {error && <p className="error-message">{error}</p>}
        </div>
        
        <div className="poster-preview">
          <h3>Preview</h3>
          <div className="preview-area">
            {isGenerating ? (
              <div className="generating-indicator">
                <div className="spinner"></div>
                <p>Creating your poster...</p>
                <p className="wait-note">This may take up to 30 seconds</p>
              </div>
            ) : generatedImage ? (
              <img src={generatedImage} alt="Generated poster" className="generated-image" />
            ) : (
              <div className="empty-preview">
                <p>Your generated poster will appear here</p>
              </div>
            )}
          </div>
          
          {generatedImage && (
            <div className="poster-actions">
              <button className="download-btn" onClick={downloadPoster}>
                Download Poster
              </button>
              <button className="add-to-cart-btn" onClick={addPosterToCart}>
                Add to Cart (₹{posterSizes[selectedSize].price.toLocaleString('en-IN')})
              </button>
            </div>
          )}
        </div>
      </div>
      
      <div className="designer-info">
        <h3>How It Works</h3>
        <ol>
          <li>Describe your product and the type of poster you need</li>
          <li>Our AI will generate a custom poster based on your description</li>
          <li>Download the poster or add it directly to your cart</li>
          <li>Complete checkout to order physical prints of your poster</li>
        </ol>
        <p className="note">Note: Generated images are for preview purposes. Final printed posters may vary slightly in color and quality.</p>
      </div>
    </div>
  );
};

export default PosterDesigner;