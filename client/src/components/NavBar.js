import React from 'react';

import "../index.css"
import Header from '../pages/Header';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg bg-white">
          <div className="container-fluid container-lg" id="round-onclick">
            <a className="logo text-decoration-none" href="#">
              <h1>Mkulima Digital</h1>
            </a>
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
                  < Link to = "/solutions" className="nav-link">
                    SOLUTIONS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/blogs" className="nav-link" >
                    BLOGS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/community"  className="nav-link">
                    COMMUNITY
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/careers"  className="nav-link">
                    CAREERS
                  </Link>
                </li>
                <li className="nav-item">
                  <Link to="/finance"  className="nav-link">
                    FINANCE
                  </Link>
                </li>
              </ul>
              <Link to="/support"  className="btn sm primary">SUPPORT</Link>
              <Link to="/login"  className="btn sm login">LOGIN</Link>
            </div>
          </div>
        </nav>
        <Header />
    </div>
  );
};

export default NavBar;
