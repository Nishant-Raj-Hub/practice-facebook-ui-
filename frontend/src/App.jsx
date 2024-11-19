import React, { useState } from "react";
import "./App.css";

function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please enter both email and password.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message);
        setEmail(""); // Clear email field
        setPassword(""); // Clear password field
      } else {
        alert(`Error: ${data.message}`);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to connect to the server. Please try again later.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        <div className="branding">
          <h1 className="logo">facebook</h1>
          <p className="tagline">
            Connect with friends and the world around you on Facebook.
          </p>
        </div>
        <div className="login-form">
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email address or phone number"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="login-button">
              Log In
            </button>
            <a href="#" className="forgot-password">
              Forgotten password?
            </a>
            <hr />
            <button className="signup-button">Create New Account</button>
          </form>
        </div>
      </div>
      <footer className="footer">
        <p>© 2024 Facebook Clone. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default App;
