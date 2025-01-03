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
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Home from './Home';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  // Form states
  const [name, setName] = useState('');  // New state for name
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [location, setLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);

  // Reference for Pricing section
  const pricingRef = useRef(null);

  // Load cart items from localStorage on initial render
  useEffect(() => {
    window.scrollTo(0, 0);

    const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (savedCartItems) {
      setCartItems(savedCartItems);
    }
  }, []);

  // Save cart items to localStorage whenever they change
  useEffect(() => {
    if (cartItems.length > 0) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const scrollToPricing = () => {
    pricingRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addToCart = (item) => {
    const existingItem = cartItems.find((cartItem) => cartItem.name === item.name);
    if (existingItem) {
      setCartItems(
        cartItems.map((cartItem) =>
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

  const increaseQuantity = (name) => {
    setCartItems(
      cartItems.map((item) =>
        item.name === name ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (name) => {
    setCartItems(
      cartItems.map((item) =>
        item.name === name && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  const removeItemFromCart = (name) => {
    setCartItems(cartItems.filter((item) => item.name !== name));
    toast.success(`${name} has been removed from your cart!`);
  };

  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  const handleOrderConfirmation = () => {
    if (!name || !address || !mobile) {
      toast.error('Please fill in all the fields!');
      return;
    }

    // Construct the WhatsApp message (without URL encoding for new lines)
    const message = `Hello! I would like to place an order.\n\n` +
                    `*Name*: ${name}\n` +
                    `*Address*: ${address}\n` +
                    `*Mobile*: ${mobile}\n\n` +
                    `*Order Details*:\n` +
                    `${cartItems.map(item => `• ${item.name} - Qty: ${item.quantity}, Price: RS ${item.price.split(' ')[1]}`).join('\n')}\n\n` +
                    `*Total Price*: RS ${cartItems
                      .reduce(
                        (total, item) =>
                          total + parseFloat(item.price.split(' ')[1]) * item.quantity,
                        0
                      )
                      .toFixed(2)}`;

    // Ensure the message is properly encoded for the URL
    const whatsappURL = `https://wa.me/918010943543?text=${encodeURIComponent(message)}`;

    // Show confirmation popup
    if (window.confirm("We are redirecting you to WhatsApp. Press OK to send your order details.")) {
      // Set order confirmed state and clear the cart
      setOrderConfirmed(true);
      setCartItems([]); // Clear cart after order is confirmed
      toast.success('Your order has been confirmed!');

      setTimeout(() => {
        setOrderConfirmed(false);
        window.location.href = whatsappURL; // Redirect to WhatsApp chat
      }, 500); // Reduced the delay to 1 second
    }
  };

  return (
    <div>
      <Home />
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
            {cartItems.map((item) => (
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
                    <button
                      className="remove-item-button"
                      onClick={() => removeItemFromCart(item.name)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="order-details">
            <div className="form-group">
              <label htmlFor="name">Full Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
              />
            </div>
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
