import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo">
          <h3>Our Company</h3>
        </div>

        {/* Links Section */}
        <div className="footer-links">
  <ul>
    <li><a href="#about">About Us</a></li>
    <li><a href="#products">Products</a></li> {/* Link to Pricing Section */}
    <li><a href="#contact">Contact</a></li>
  </ul>
</div>


        {/* Social Media Section */}
        <div className="footer-social">
          <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="social-icon">
            <i className="fab fa-instagram"></i>
          </a>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2024 Our Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
