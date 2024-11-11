import React, { useState } from 'react';
import './Navbar.css';

const Navbar = ({ cartItems, toggleCartVisibility, scrollToPricing }) => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
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
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Best Seller</a></li>
        <li><a href="#about">Juices</a></li>
        <li><a href="#contact">Contact</a></li>
        <li>
          <button className="order-now-button" onClick={scrollToPricing}>
            Order Now
          </button>
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
    </nav>
  );
};

export default Navbar;
