import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom"; // Import useNavigate instead of useHistory
import "./signup.css";
import loginImage from "../images/display3.jpg";

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:5555/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      if (response.status === 201) {
        window.alert("User registered successfully!");
        navigate("/login"); // Use navigate function instead of history.push
      } else {
        window.alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error:", error);
      window.alert("An error occurred while processing your request");
    }
  };

  return (
    <>
      <div className="bckg">
        <div className="register-container">
          <div className="image-container">
            <img src={loginImage} alt="Login" className="login-image" />
          </div>
          <div className="form-container">
            <h1>
              <span
                role="img"
                aria-label="fountain-pen"
                style={{ color: "white" }}
              >
                🖋️
              </span>{" "}
              Getting Started
            </h1>
            <h2>Kindly input your details to continue</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label>Username:</label>
                <br />
                <input
                  type="text"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Email:</label>
                <br />
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div>
                <label>Password:</label>
                <br />
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit">Sign Up</button>
            </form>
            <p>
              Already have an account?{" "}
              <NavLink to="/login" style={{ color: "white" }}>
                Login
              </NavLink>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupForm;
