import React, { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    tweet: "",
    followers: "",
    following: "",
    action: "",
  });

  const [response, setResponse] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("http://172.191.112.177:5000/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log(data);
      setResponse(data.prediction);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="App">
      <h1>TWITTER SPAM DETECTOR</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Tweet:</label>
          <input
            type="text"
            name="tweet"
            value={formData.tweet}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Followers:</label>
          <input
            type="number"
            name="followers"
            value={formData.followers}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Following:</label>
          <input
            type="number"
            name="following"
            value={formData.following}
            onChange={handleChange}
            min="0"
          />
        </div>
        <div className="form-group">
          <label>Action/Activity Count:</label>
          <input
            type="number"
            name="action"
            value={formData.actionCount}
            onChange={handleChange}
            min="0"
          />
        </div>
        <button type="submit">Predict</button>
      </form>
      {response !== null && (
        <div
          className={`result-box ${
            response === "Spam" ? "detected" : "not-detected"
          }`}
        >
          {response}
        </div>
      )}
    </div>
  );
}

export default App;
