import React, { useState } from 'react';
import { Link } from 'react-scroll'; // Ensure you import Link correctly
import './Navbar.css';

const Navbar = ({ cartItems, toggleCartVisibility }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to control the popup visibility

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const showPopup = () => {
    setIsPopupOpen(true); // Show the popup
  };

  const closePopup = () => {
    setIsPopupOpen(false); // Close the popup
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Sugarcane Delight</h1>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        <i className={`fas ${menuOpen ? 'fa-times' : 'fa-bars'}`}></i>
      </button>
    <ul className={`navbar-links ${menuOpen ? 'open' : ''}`}>
  <li>
    <Link to="home" smooth={true} duration={500}>
      Home
    </Link>
  </li>
  <li>
    <Link to="best-seller" smooth={true} duration={500}>
      Best Seller
    </Link>
  </li>
  {/* <li>
    <a href="#contact">Contact</a>
  </li> */}
  <li id="order-now">
    <Link to="products" smooth={true} duration={500}>
      <button className="order-now-button">Juices</button>
    </Link>
  </li>
  <li className="cart-icon">
    <button onClick={toggleCartVisibility} className="cart-button">
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
