import React from 'react';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <h1>Sugarcane Delight</h1>
      </div>
      <ul className="navbar-links">
        <li><a href="#home">Home</a></li>
        <li><a href="#menu">Best Seller </a></li>
        <li><a href="#about">Juices</a></li>
        <li><a href="#contact">#</a></li>
        <li><a href="#order" className="order-now-button">Order Now</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;
