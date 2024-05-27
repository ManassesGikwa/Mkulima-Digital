import { useNavigate } from 'react-router-dom'; // Import useNavigate instead of useHistory
import './login.css'; // Import your CSS file here
import React, { useState } from 'react';


const Login = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [role, setRole] = useState('user'); // Default role is user
  const navigate = useNavigate(); // Use useNavigate hook instead of useHistory

  const handleSignUpClick = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      action: 'register',
      username: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'), // Get selected role from the form data
    };

    try {
      // Send user data to the server for registration
      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Handle response (e.g., show success message, redirect)
      const data = await response.json();
      console.log(data); // Handle response from the server
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle error (e.g., display error message)
    }
  };

  const handleSignInClick = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const usernameOrEmail = formData.get('username'); // Ensure the input field name is 'username'
    const password = formData.get('password'); // Ensure the input field name is 'password'
    
    const userData = {
      action: 'login',
      username: usernameOrEmail,
      password: password,
    };

    try {
      // Send user credentials to the server for authentication
      const response = await fetch('/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
  
      // Handle response
      if (response.ok) {
        // If the response is successful (status code 200), log in was successful
        const data = await response.json();
        console.log('Login successful:', data);
        // Redirect to home page after successful login
        setIsLoggedIn(true)
        navigate('/'); // Use navigate to redirect
      } else {
        // If the response is not successful, handle the error
        const errorText = await response.text();
        console.error('Login failed:', errorText);
        // Optionally display an error message to the user
      }
    } catch (error) {
      console.error('Error signing in:', error);
      // Handle other errors, such as network errors
    }
  };

  return (
    <div className='login-body'>
      <div className={`container-log ${isSignUpActive ? 'right-panel-active' : ''}`} id="container-log">
        <div className="form-container-log sign-up-container">
          <form onSubmit={handleSignUpClick}>
            <h1>Create Account</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your email for registration</span>
            <input type="text" name="name" placeholder="Name" required />
            <input type="email" name="email" placeholder="Email" required />
            <input type="password" name="password" placeholder="Password" required />
            <select name="role" value={role} onChange={(e) => setRole(e.target.value)}>
              <option value="user">User</option>
              <option value="expert">Expert</option>
            </select>
            <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
            <button type="submit">Sign Up</button>
          </form>
        </div>
        <div className="form-container-log sign-in-container">
          <form onSubmit={handleSignInClick}>
            <h1>Sign in</h1>
            <div className="social-container">
              <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
              <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
              <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
            </div>
            <span>or use your account</span>
            <input type="text" name="username" placeholder="Username or Email" required /> {/* Change type to text and name to username */}
            <input type="password" name="password" placeholder="Password" required />
            <a href="#">Forgot your password?</a>
            <button type="submit">Sign In</button>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Welcome Back!</h1>
              <p>To keep connected with us please login with your personal info</p>
              <button className="ghost" onClick={() => setIsSignUpActive(false)}>Sign In</button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Hello, Friend!</h1>
              <p>Enter your personal details and start journey with us</p>
              <button className="ghost" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
