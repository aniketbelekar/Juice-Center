import React, { useState } from 'react';
import { Link } from 'react-scroll'; // For smooth scrolling
import './Navbar.css';

const Navbar = ({ cartItems, toggleCartVisibility }) => {
  const [menuOpen, setMenuOpen] = useState(false); // Controls hamburger menu
  const [isPopupOpen, setIsPopupOpen] = useState(false); // Controls popup visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const closeMenu = () => {
    setMenuOpen(false); // Ensure menu closes
  };

  const showPopup = () => {
    setIsPopupOpen(true); // Show confirmation popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="navbar-logo">
        <h1>Sugarcane Delight</h1>
      </div>

      {/* Hamburger Menu */}
      <button
        className="hamburger"
        onClick={toggleMenu}
        aria-label={menuOpen ? 'Close Menu' : 'Open Menu'}
      >
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>

      {/* Navigation Links */}
      <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
        <li>
          <Link to="home" smooth={true} duration={500} onClick={closeMenu}>
            Home
          </Link>
        </li>
        <li>
          <Link to="best-seller" smooth={true} duration={500} onClick={closeMenu}>
            Best Seller
          </Link>
        </li>
        <li id="order-now">
          <Link to="products" smooth={true} duration={500} onClick={closeMenu}>
            <button className="order-now-button">Order Now</button>
          </Link>
        </li>
        <li className="cart-icon">
          <button
            onClick={() => {
              toggleCartVisibility();
              closeMenu(); // Close menu when cart is opened
            }}
            className="cart-button"
            aria-label="View Cart"
          >
            <i className="fas fa-shopping-cart"></i>
            {cartItems?.length > 0 && (
              <span className="cart-count">{cartItems.length}</span>
            )}
          </button>
        </li>
      </ul>

      {/* Confirmation Pop-up Modal */}
      {isPopupOpen && (
        <div className="popup-message">
          <div className="popup-content">
            <p>Your order has been placed successfully!</p>
            <button className="close-popup" onClick={closePopup}>
              Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
