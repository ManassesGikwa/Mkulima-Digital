// import React, { useState } from 'react';

// const Login = () => {
//   const [isSignUpActive, setIsSignUpActive] = useState(false);

//   const handleSignUpClick = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const userData = {
//       name: formData.get('name'),
//       email: formData.get('email'),
//       password: formData.get('password'),
//       // You may include additional fields like 'isExpert' based on your needs
//     };

//     try {
//       // Send user data to the server for registration
//       const response = await fetch('/api/signup', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       // Handle response (e.g., show success message, redirect)
//       const data = await response.json();
//       console.log(data); // Handle response from the server
//     } catch (error) {
//       console.error('Error signing up:', error);
//       // Handle error (e.g., display error message)
//     }
//   };

//   const handleSignInClick = async (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.target);
//     const userData = {
//       email: formData.get('email'),
//       password: formData.get('password'),
//     };

//     try {
//       // Send user credentials to the server for authentication
//       const response = await fetch('/api/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(userData),
//       });

//       // Handle response (e.g., show success message, set authentication state)
//       const data = await response.json();
//       console.log(data); // Handle response from the server
//     } catch (error) {
//       console.error('Error signing in:', error);
//       // Handle error (e.g., display error message)
//     }
//   };

//   return (
//     <div className='login-body'>
//       <div className={`container-log ${isSignUpActive ? 'right-panel-active' : ''}`} id="container-log">
//         <div className="form-container-log sign-up-container">
//           <form onSubmit={handleSignUpClick}>
//             <h1>Create Account</h1>
//             <div className="social-container">
//               <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//               <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//               <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//             <span>or use your email for registration</span>
//             <input type="text" name="name" placeholder="Name" required />
//             <input type="email" name="email" placeholder="Email" required />
//             <input type="password" name="password" placeholder="Password" required />
//             <input type="password" name="confirmPassword" placeholder="Confirm Password" required />
//             <button type="submit">Sign Up</button>
//           </form>
//         </div>
//         <div className="form-container-log sign-in-container">
//           <form onSubmit={handleSignInClick}>
//             <h1>Sign in</h1>
//             <div className="social-container">
//               <a href="#" className="social"><i className="fab fa-facebook-f"></i></a>
//               <a href="#" className="social"><i className="fab fa-google-plus-g"></i></a>
//               <a href="#" className="social"><i className="fab fa-linkedin-in"></i></a>
//             </div>
//             <span>or use your account</span>
//             <input type="email" name="email" placeholder="Email" required />
//             <input type="password" name="password" placeholder="Password" required />
//             <a href="#">Forgot your password?</a>
//             <button type="submit">Sign In</button>
//           </form>
//         </div>
//         <div className="overlay-container">
//           <div className="overlay">
//             <div className="overlay-panel overlay-left">
//               <h1>Welcome Back!</h1>
//               <p>To keep connected with us please login with your personal info</p>
//               <button className="ghost" onClick={() => setIsSignUpActive(false)}>Sign In</button>
//             </div>
//             <div className="overlay-panel overlay-right">
//               <h1>Hello, Friend!</h1>
//               <p>Enter your personal details and start journey with us</p>
//               <button className="ghost" onClick={() => setIsSignUpActive(true)}>Sign Up</button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;

import React, { useState } from 'react';

const Login = () => {
  const [isSignUpActive, setIsSignUpActive] = useState(false);
  const [role, setRole] = useState('user'); // Default role is user

  const handleSignUpClick = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const userData = {
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      role: formData.get('role'), // Get selected role from the form data
    };

    try {
      // Send user data to the server for registration
      const response = await fetch('/api/signup', {
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
    const userData = {
      email: formData.get('email'),
      password: formData.get('password'),
    };

    try {
      // Send user credentials to the server for authentication
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      // Handle response (e.g., show success message, set authentication state)
      const data = await response.json();
      console.log(data); // Handle response from the server
    } catch (error) {
      console.error('Error signing in:', error);
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
            <input type="email" name="email" placeholder="Email" required />
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
