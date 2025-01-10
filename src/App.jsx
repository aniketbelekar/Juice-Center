import React, { useState, useRef, useEffect } from 'react';
import Navbar from './Navbar';
import HeroSection from './Hero';
import Pricing from './Priceing';
import BestSellerJuice from './SellerJuice';
import Benefits from './Benifits';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import Free from './Free';
import loaderImage from './Images/icons8-sugarcane-48.png';

const App = () => {
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [cartVisible, setCartVisible] = useState(false);
  const [orderConfirmed, setOrderConfirmed] = useState(false);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState('');
  const [notes, setNotes] = useState('');
  const [location, setLocation] = useState(null);
  const [mapVisible, setMapVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [name, setName] = useState('');
  const pricingRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    try {
      const savedCartItems = JSON.parse(localStorage.getItem('cartItems'));
      if (savedCartItems) {
        setCartItems(savedCartItems);
      }
    } catch (error) {
      console.error('Failed to load cart items from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      if (cartItems.length > 0) {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
      }
    } catch (error) {
      console.error('Failed to save cart items to localStorage:', error);
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

  const validateInputs = () => {
    if (!name.trim()) {
      toast.error('Name cannot be empty.');
      return false;
    }
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      toast.error('Invalid mobile number.');
      return false;
    }
    if (!address.trim()) {
      toast.error('Address cannot be empty.');
      return false;
    }
    return true;
  };

  const handleOrderConfirmation = () => {
    if (!validateInputs() || cartItems.length === 0) {
      toast.error('Please complete all fields and add items to your cart.');
      return;
    }

    const cartDetails = cartItems
      .map(
        (item) => `${item.name} (Qty: ${item.quantity}, Price: ${item.price})`
      )
      .join('\n');

    const totalPrice = cartItems
      .reduce(
        (total, item) =>
          total + parseFloat(item.price.split(' ')[1]) * item.quantity,
        0
      )
      .toFixed(2);

    const message = `Order Confirmation:
    Name: ${name}
    Address: ${address}
    Mobile: ${mobile}
    Notes: ${notes || 'N/A'}

    Cart Items:
    ${cartDetails}

    Total: RS ${totalPrice}`;

    const whatsappNumber = '918010943543';
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
      message
    )}`;

    window.open(whatsappURL, '_blank');
    setOrderConfirmed(true);
    setCartItems([]);
  };

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lng: longitude });
          setMapVisible(true);
        },
        (error) => {
          switch (error.code) {
            case error.PERMISSION_DENIED:
              toast.error('Location access denied. Please allow location access.');
              break;
            case error.POSITION_UNAVAILABLE:
              toast.error('Location information is unavailable.');
              break;
            case error.TIMEOUT:
              toast.error('Request to get location timed out.');
              break;
            default:
              toast.error('An unknown error occurred while retrieving location.');
          }
        }
      );
    } else {
      toast.error('Geolocation is not supported by this browser.');
    }
  };

  const handleMapClick = (event) => {
    const selectedLat = event.latLng.lat();
    const selectedLng = event.latLng.lng();
    setSelectedLocation({ lat: selectedLat, lng: selectedLng });

    const geocoder = new window.google.maps.Geocoder();
    const latLng = { lat: selectedLat, lng: selectedLng };
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status === 'OK' && results[0]) {
        setAddress(results[0].formatted_address);
      } else {
        toast.error('Unable to retrieve address for the selected location.');
      }
    });
  };

  if (loading) {
    return (
      <div className="loader-container">
        <img src={loaderImage} alt="Loading..." className="loader-image" />
        <p>Loading, please wait...</p>
      </div>
    );
  }

  return (
    <div>
      <Free />
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

      {mapVisible && (
        <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
          <GoogleMap
            mapContainerStyle={{ height: '400px', width: '100%' }}
            center={location}
            zoom={15}
            onClick={handleMapClick}
          >
            {selectedLocation && <Marker position={selectedLocation} />}
            {selectedLocation && (
              <InfoWindow position={selectedLocation}>
                <div>
                  <h4>Selected Location</h4>
                  <p>{address}</p>
                </div>
              </InfoWindow>
            )}
          </GoogleMap>
        </LoadScript>
      )}

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
              <label htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
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
              <label htmlFor="address">Address:</label>
              <textarea
                id="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Enter your address"
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
            <button className="order-confirm-button" onClick={handleOrderConfirmation}>
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