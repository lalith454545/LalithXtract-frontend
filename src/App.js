import React, { useState } from "react";
import Tesseract from "tesseract.js";
import axios from "axios";
import "./App.css";

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_URL = "https://lalithxtract-backend-1.onrender.com"; // ✅ Updated Backend URL

  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const extractText = async () => {
    if (!image) return alert("Please upload an image!");

    const formData = new FormData();
    formData.append("image", image);

    setLoading(true);
    try {
      const { data } = await axios.post(`${API_URL}/extract-text`, formData);
      setText(data.text);
      setExtractedText(data.text);
    } catch (error) {
      console.error("Error extracting text:", error);
      alert("Failed to extract text. Please try again!");
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    if (extractedText.trim()) {
      navigator.clipboard.writeText(extractedText);
      alert("Text copied to clipboard! ✅");
    } else {
      alert("No text to copy! ❌");
    }
  };

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <h1 className="app-title">LalithXtract: Screenshot to Text in a Snap</h1>

      <button onClick={() => setDarkMode(!darkMode)} className="toggle-mode">
        {darkMode ? "Light Mode ☀️" : "Dark Mode 🌙"}
      </button>

      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>📸 Quick Screenshot & Text Extractor by Lalith Srinandan</h2>
        <input type="file" accept="image/*" onChange={handleImageUpload} />
        <button onClick={extractText} disabled={loading}>
          {loading ? "Extracting..." : "Extract Text"}
        </button>
        <button onClick={copyToClipboard}>Copy to Clipboard</button>
        <textarea value={text} readOnly rows={5} cols={40} />
      </div>
    </div>
  );
};

export default App;
