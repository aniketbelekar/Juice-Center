import React from 'react';
import { toast } from 'react-toastify'; // Import the toast function from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the default styles for toast notifications
import './Pricing.css'; // Ensure you link the CSS file

const Pricing = ({ addToCart }) => {
  const juices = [
    { name: "Fresh Sugar Cane Juice", price: "RS 60/LT", description: "Freshly pressed sugar cane juice with a hint of lime.", image: "src/Images/mint juice.jpg" },
    { name: "Sugar Cane with Ginger", price: "RS 60/LT", description: "A refreshing twist with ginger for an added zing.", image: "src/Images/ginger.jpg" },
    { name: "Sugar Cane Mint Lemon", price: "RS 60/LT", description: "A cool and minty sugar cane juice with a mojito flavor.", image: "src/Images/mint lemon.jpg" },
  ];

  // Function to show the toast notification
  const showToast = (juiceName) => {
    toast.success(`Added ${juiceName} to cart!`, {
      position: toast.POSITION.BOTTOM_CENTER,
      autoClose: 3000, // Auto close after 3 seconds
      hideProgressBar: true, // Hide the progress bar
      style: {
        backgroundColor: '#4CAF50', // Green color for success
        color: '#fff', // White text color
        fontWeight: 'bold', // Bold text
      },
    });
  };

  return (
    <div className="pricing-section">
      <h2 className="pricing-heading">Our Juice Pricing</h2>
      <div className="pricing-list">
        {juices.map((juice, index) => (
          <div key={index} className="pricing-card">
            <img src={juice.image} alt={juice.name} className="juice-image" />
            <h3>{juice.name}</h3>
            <p>{juice.description}</p>
            <div className="price-container">
              <span className="price">{juice.price}</span>
              <button
                className="order-btn"
                onClick={() => {
                  addToCart(juice); // Add to cart function
                  showToast(juice.name); // Show the success toast
                }}
              >
                Order Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Pricing;
