import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Pricing from './Priceing'; // Fixed the import spelling here
import BestSellerJuice from './BestSellerJuice';
import Benefits from './Benifits';
import ContactSection from './ContactSection';
import ShopLocation from './ShopLocation';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Form states
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [notes, setNotes] = useState('');

  // Reference for Pricing section
  const pricingRef = useRef(null);

  // Reset scroll position on initial render
  useEffect(() => {
    window.scrollTo(0, 0); // Ensure the page loads at the top

    // Load cart items from localStorage on page load
    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Save cart items to localStorage whenever cartItems state changes
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // Scroll to Pricing section
  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add item to cart
  const addToCart = (item) => {
    const existingItem = cartItems.find(cartItem => cartItem.name === item.name);
    if (existingItem) {
      setCartItems(
        cartItems.map(cartItem =>
          cartItem.name === item.name
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        )
      );
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
    toast.success(`${item.name} has been added to your cart!`);
  };

  // Increase quantity of item
  const increaseQuantity = (name) => {
    setCartItems(
      cartItems.map(item =>
        item.name === name
          ? { ...item, quantity: item.quantity + 1 }
          : item
      )
    );
  };

  // Decrease quantity of item
  const decreaseQuantity = (name) => {
    setCartItems(
      cartItems.map(item =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  // Toggle Cart visibility
  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  // Handle order confirmation
  const handleOrderConfirmation = () => {
    if (!address || !mobile) {
      toast.error('Please fill in all the fields!');
      return;
    }

    setOrderConfirmed(true);
    setCartItems([]); // Clear the cart after order is confirmed
    setCartVisible(false); // Hide the cart summary
    toast.success('Your order has been confirmed!');

    // Hide confirmation message after 3 seconds
    setTimeout(() => {
      setOrderConfirmed(false);
    }, 3000);
  };

  return (
    <div>
      <Navbar
        cartItems={cartItems}
        toggleCartVisibility={toggleCartVisibility}
        scrollToPricing={scrollToPricing}
      />
      <HeroSection />

      <BestSellerJuice addToCart={addToCart} />

      <div ref={pricingRef}>
        <Pricing addToCart={addToCart} />
      </div>
      <Benefits />
      <ShopLocation />
      <ContactSection />
      <Footer />

      <ToastContainer
        position="top-left"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop={false}
        closeButton={true}
        rtl={false}
      />

      {cartVisible && (
        <div className={`cart-summary ${cartVisible ? 'visible' : ''}`}>
          <div className="cart-summary-header">
            <h3>Cart Summary</h3>
            <button className="close-cart-button" onClick={toggleCartVisibility}>
              X
            </button>
          </div>
          <ul>
            {cartItems.map(item => (
              <li key={item.name}>
                <span className="item-name">{item.name}</span>
                <div>
                  <span className="item-price">Price: {item.price}</span>
                  <div>
                    <button
                      className="increase-quantity-button"
                      onClick={() => increaseQuantity(item.name)}
                    >
                      +
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      className="decrease-quantity-button"
                      onClick={() => decreaseQuantity(item.name)}
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="order-details">
            <div className="form-group">
              <label htmlFor="address">Address:</label>
              <input
                type="text"
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
              />
            </div>
            <div className="form-group">
              <label htmlFor="mobile">Mobile Number:</label>
              <input
                type="text"
                id="mobile"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Enter your mobile number"
              />
            </div>
            <div className="form-group">
              <label htmlFor="notes">Additional Notes:</label>
              <textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Enter any additional notes"
              />
            </div>
            <div className="total-price">
              <h4>
                Total: RS{' '}
                {cartItems
                  .reduce(
                    (total, item) =>
                      total + parseFloat(item.price.split(' ')[1]) * item.quantity,
                    0
                  )
                  .toFixed(2)}
              </h4>
            </div>
            <button
              className="order-confirm-button"
              onClick={handleOrderConfirmation}
            >
              Confirm Order
            </button>
          </div>
        </div>
      )}

      {orderConfirmed && (
        <div className="order-confirmation-message">
          <i className="fas fa-check-circle"></i>
          <h4>Order Confirmed! Your order is being processed.</h4>
        </div>
      )}
    </div>
  );
};

export default App;
