import React, { useState } from 'react';
import Navbar from './Navbar';
import HeroSection from './HeroSection';
import Pricing from './Pricei';
import { ToastContainer, toast } from 'react-toastify'; // Importing Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles
import './App.css';

const App = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  // Function to add an item to the cart
  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
    
    // Show toast when item is added
    toast.success(`${item.name} has been added to your cart!`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000,
      hideProgressBar: true,
      style: {
        backgroundColor: '#4CAF50', // Green background
        color: '#fff',
        fontWeight: 'bold',
      },
    });
  };

  // Toggle the visibility of the cart summary
  const toggleCartVisibility = () => {
    setCartVisible(!cartVisible);
  };

  // Function to confirm the order
  const confirmOrder = () => {
    if (!address || !contactNumber) {
      alert('Please fill in your address and contact number before confirming the order.');
      return;
    }
    alert(`Order confirmed!\n\nAddress: ${address}\nContact Number: ${contactNumber}\nAdditional Notes: ${additionalNotes}`);
    
    // Clear the cart and close the cart summary after confirming
    setCartItems([]);
    setAddress('');
    setContactNumber('');
    setAdditionalNotes('');
    setCartVisible(false);
  };

  return (
    <div>
      {/* Pass cartItems and toggleCartVisibility to Navbar */}
      <Navbar cartItems={cartItems} toggleCartVisibility={toggleCartVisibility} />
      
      <HeroSection />
      <Pricing addToCart={addToCart} /> {/* Pass addToCart to Pricing component */}
      
      {/* Cart Summary Dropdown */}
      {cartVisible && (
        <div className="cart-summary">
          <div className="cart-summary-header">
            <h3>Your Cart</h3>
            {/* Close button to hide cart summary */}
            <button onClick={() => setCartVisible(false)} className="close-cart-button">X</button>
          </div>

          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
            <ul>
              {cartItems.map((item, index) => (
                <li key={index}>
                  {item.name} - {item.price}
                </li>
              ))}
            </ul>
          )}

          {/* Address, Contact Number, and Additional Notes Sections */}
          {cartItems.length > 0 && (
            <div className="order-details">
              <div className="form-group">
                <label htmlFor="address">Address:</label>
                <input
                  type="text"
                  id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter your delivery address"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="contactNumber">Contact Number:</label>
                <input
                  type="text"
                  id="contactNumber"
                  value={contactNumber}
                  onChange={(e) => setContactNumber(e.target.value)}
                  placeholder="Enter your contact number"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="additionalNotes">Additional Notes:</label>
                <textarea
                  id="additionalNotes"
                  value={additionalNotes}
                  onChange={(e) => setAdditionalNotes(e.target.value)}
                  placeholder="Any additional instructions for your order"
                />
              </div>
              
              {/* Order Confirm button */}
              <button onClick={confirmOrder} className="order-confirm-button">Confirm Order</button>
            </div>
          )}
        </div>
      )}

      {/* ToastContainer to display notifications */}
      <ToastContainer />
    </div>
  );
};

export default App;
