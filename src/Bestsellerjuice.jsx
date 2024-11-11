import React from 'react';
import './BestSellerJuice.css';

const BestSellerJuice = ({ addToCart }) => {
  const bestSellingJuice = {
    name: 'Mint Lemon Sugarcane Bliss',
    description:
      "Cool down and recharge with our best-selling Mint Lemon Sugarcane Juice! Freshly squeezed sugarcane meets zesty lemon and a hint of cooling mint, creating a perfectly balanced, naturally sweet, and refreshing drink. Packed with antioxidants, vitamins, and a burst of flavor, it’s the ultimate thirst-quencher and health booster. One sip, and you'll know why it’s a favorite.",
    price: 'RS 60',
    imageUrl: 'src/Images/mint juice.jpg', // Ensure this path is correct in your project structure
  };

  return (
    <div className="best-seller-juice">
      {/* Price Sticker */}
      <div className="price-sticker">{bestSellingJuice.price}</div>

      {/* Juice Image */}
      <img
        src={bestSellingJuice.imageUrl}
        alt={bestSellingJuice.name}
        className="juice-image"
      />

      {/* Text Content */}
      <div className="text-content">
        <h2>Discover Our Best-Selling Juice Today!</h2>
        <h3>{bestSellingJuice.name} – The Ultimate Refresher!</h3>
        <p>{bestSellingJuice.description}</p>

        {/* Add to Cart Button */}
        <button
          className="add-to-cart-button"
          onClick={() => addToCart(bestSellingJuice)}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default BestSellerJuice;
