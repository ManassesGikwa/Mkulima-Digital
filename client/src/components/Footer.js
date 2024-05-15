import React from 'react';
import '../index.css'; // Assuming you have a corresponding CSS file for styling

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer-row">
        <div className="footer-col">
          <h4>SOLUTIONS</h4>
          <ul className="links">
            <li><a href="#">Onfarm</a></li>
            <li><a href="#">Store</a></li>
            <li><a href="#">Trade</a></li>
            <li><a href="#">Broker</a></li>
            <li><a href="#">Finance</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>RESOURCES</h4>
          <ul className="links">
            <li><a href="#">Customer Stories</a></li>
            <li><a href="#">Blog</a></li>
            <li><a href="#">Themes</a></li>
            <li><a href="#">Support</a></li>
            <li><a href="#">Legals</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>COMMUNITY</h4>
          <ul className="links">
            <li><a href="#">Our Team</a></li>
            <li><a href="#">Why Mkulima Digital</a></li>
            <li><a href="#">ICareers</a></li>
            <li><a href="#">News</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Newsletter</h4>
          <p>
            Subscribe to our newsletter for a weekly dose
            of news, updates, helpful tips, and
            exclusive offers.
          </p>
          <form action="#">
            <input type="text" placeholder="Your email" required />
            <button type="submit">SUBSCRIBE</button>
          </form>
          <div className="icons">
            <i className="fab fa-facebook-f"></i>
            <i className="fab fa-twitter"></i>
            <i className="fab fa-linkedin"></i>
            <i className="fab fa-github"></i>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
