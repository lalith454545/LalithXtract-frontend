import React, { useState } from "react";
import Tesseract from "tesseract.js";
import axios from 'axios';
import './App.css';

const App = () => {
  const [image, setImage] = useState(null);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [extractedText, setExtractedText] = useState("");
  const [darkMode, setDarkMode] = useState(false);


  const handleImageUpload = (event) => {
    setImage(event.target.files[0]);
  };

  const extractText = async () => {
    if (!image) return alert("Please upload an image!");
    
    const formData = new FormData();
    formData.append("image", image);
  
    setLoading(true);
    const { data } = await axios.post("http://localhost:5000/extract-text", formData);
    setText(data.text);
    setExtractedText(data.text); // Replace `ocrResult` with your actual OCR output

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
const toggleDarkMode = () => setDarkMode(!darkMode);

  return (
    <div className={darkMode ? "dark-mode" : "light-mode"}>
      <h1 className="app-title">LalithXtract: Screenshot to Text in a Snap </h1>

    <button onClick={toggleDarkMode}>
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
