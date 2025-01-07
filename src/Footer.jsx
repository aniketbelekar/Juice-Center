import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo">
          <h3>Our Shop Location :Ramshewadkar Parisar Wani:445304 </h3>
          {/* <h2>Location</h2> */}
        </div>

        {/* Links Section */}
        <div className="footer-links">
  {/* <ul> */}
    {/* <li><a href="#about">About Us</a></li> */}
    {/* <li><a href="#products">Products</a></li> Link to Pricing Section */}
    {/* <li><a href="#contact">Contact</a></li> */}
  {/* </ul> */}
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
        <p>&copy; 2025 . All Rights Reserved. Made by Aniket</p>
      </div>
    </footer>
  );
};

export default Footer;
