import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

import '../index.css';
import Home from '../pages/Home';

const NavBar = () => {
  const [expert, setExpert] = useState(null);

  useEffect(() => {
    // Fetch expert data
    fetch('/experts/1')
      .then((response) => response.json())
      .then((data) => setExpert(data))
      .catch((error) => console.error('Error fetching expert data:', error));
  }, []);

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid container-lg" id="round-onclick">
          <h1 className="logo text-decoration-none">
            <Link to="/">Mkulima Digital</Link>
          </h1>
          <button
            className="navbar-toggler menu border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list" id="menu"></i>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav m-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to="/dashboard" className="nav-link">
                  DASHBOARD
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/blogs" className="nav-link">
                  BLOGS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/community" className="nav-link">
                  COMMUNITY
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/careers" className="nav-link">
                  CAREERS
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/finance" className="nav-link">
                  FINANCE
                </Link>
              </li>
            </ul>
            <Link to="/support" className="nav-btn sm primary">
              SUPPORT
            </Link>
            <Link to="/login" className="nav-btn sm login">
              LOGIN
            </Link>
          </div>
        </div>

        <div className="user-profile">
        <Link to="/dashboard" className="user-profile">
             {expert && (
           <div>
            <h3 style={{'marginBottom': '15px', }}>{expert.name}<FaUser className='profile-icon' /></h3>
            <p style={{ 'fontSize': "20px",}}>{expert.expertise_area}</p>
            </div>
            )}
       </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
