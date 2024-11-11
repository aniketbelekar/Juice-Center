import React from 'react';
import './ShopLocation.css';

const ShopLocation = () => {
  return (
    <div className="shop-location">
      <h2>Our Shop Location</h2>
      <div style={{ width: '100%', height: '400px', position: 'relative' }}>
        <iframe
          title="Shop Location"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d1909.9219536400237!2d78.94484131276825!3d20.062098896075582!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sin!4v1730965622989!5m2!1sen!2sin"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default ShopLocation;
