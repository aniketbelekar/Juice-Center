import React from 'react';
import './Pricing.css';

const Pricing = ({ addToCart }) => {
  const juices = [
    { 
      name: "Fresh Sugar Cane Juice with Ginger,Lemon,Mint ", 
      price: "RS 60/LT", 
      description: "Freshly pressed sugar cane juice with a Mint of lime.",
      image: "src/Images/mint juice.jpg" // Add image path here
    },
    { 
      name: "Sugar Cane with Ginger", 
      price: "RS 60/LT", 
      description: "A refreshing twist with ginger for an added zing.",
      image: "src/Images/ginger.jpg" // Add image path here
    },
    { 
      name: "Sugar Cane Mint Lemon orange ", 
      price: "RS 70/LT", 
      description: "A cool and minty sugar cane juice with a mojito flavor.",
      image: "src/Images/orange.jpg" // Add image path here
    },
    { 
      name: "Plane Sugarcane  ", 
      price: "RS 70/LT", 
      description: "A cool and Plane sugar cane juice .",
      image: "src/Images/plane.jpg" // Add image path here
    },
  ];

  return (
    <div id="products" className="pricing-section">
      <h2 className="pricing-heading">MENU CARD</h2>
      <div className="pricing-list">
        {juices.map((juice, index) => (
          <div key={index} className="pricing-card">
            <img src={juice.image} alt={juice.name} />
            <h3>{juice.name}</h3>
            <p>{juice.description}</p>
            <span className="price">{juice.price}</span>
            <button className="order-btn" onClick={() => addToCart(juice)}>
              Order Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
