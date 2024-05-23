import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import loginImage from "../images/display2.jpg";
import "./LoginForm.css";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5555/auth", { // Corrected URL to match the endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          action: 'login', // Add this line to specify the action
          username,
          password,
        }),
      });

      if (response.status === 200) {
        const data = await response.json();
        localStorage.setItem("access_token", data.access_token);
        window.alert("Login successful");
        navigate("/home"); // Use navigate function instead of history.push
      } else {
        window.alert("Login failed. Invalid credentials");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while processing your request");
    }
  };

  return (
    <div className="custom-login-setup">
      <div className="custom-login-container">
        <div className="custom-image-container">
          <img src={loginImage} alt="login" className="login-image" />
        </div>
        <div className="custom-form-container">
          <p className="hello-text">
            <span role="img" aria-label="waving-hand">
              👋
            </span>{" "}
            HELLO!
          </p>
          <h1>Welcome Back!</h1>
          <h2>Please enter your details</h2>
          <form onSubmit={handleSubmit}>
            <label htmlFor="username" className="label">
              Username
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                className="input"
                style={{ width: "100%" }}
              />
            </label>
            <label htmlFor="password" className="label">
              Password
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="input"
                style={{ width: "100%" }}
              />
            </label>
            <button type="submit" className="button">
              Log in
            </button>
            <p>
              Don't have an account?{" "}
              <NavLink to="/" className="custom-link">
                <strong>Sign Up here</strong>
              </NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
