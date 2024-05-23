import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';

const NavBar = () => {
  // Get the current location using useLocation hook
  const location = useLocation();

  // Check if the current location is '/dashboard'
  const isDashboard = location.pathname === '/dashboard';

  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-white">
        <div className="container-fluid container-lg" id="round-onclick">
          <h1 className="logo text-decoration-none"><Link to="/">Mkulima Digital</Link></h1>
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
            <Link to="/support" className="nav-btn sm primary">SUPPORT</Link>
            <Link to="/login" className="nav-btn sm login">LOGIN</Link>
            {/* Render profile icon and name if on the dashboard */}
            {isDashboard && (
              <div className="profile-icon-name">
                <FaUser className="profile-icon" />
                <span className="profile-name">John Doe</span>
              </div>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
