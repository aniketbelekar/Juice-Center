import React from 'react';
import './Navbar.css';

const Navbar = ({ cartItems, toggleCartVisibility }) => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Sugarcane Delight</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Best Seller</a></li>
        <li><a href="#about">Juices</a></li>
        <li><a href="#contact">Contact</a></li>
        <li><a href="#order" className="order-now-button">Order Now</a></li>
        
        <li className="cart">
          <button onClick={toggleCartVisibility} className="cart-button">
            <i className="fas fa-shopping-cart"></i>
            <span className="cart-count">{cartItems.length}</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
