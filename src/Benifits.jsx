import React from 'react';
import './Benifits.css';

const Benefits = () => {
  const benefitsList = [
    "Boosts Immunity: Packed with antioxidants that help boost your immune system.",
    "Rich in Fiber: Supports digestive health and helps prevent constipation.",
    "Hydrates the Body: Natural source of hydration, keeping you refreshed all day.",
    "Detoxifies the Liver: Helps cleanse and detoxify the liver.",
    "Improves Skin Health: Provides hydration and nutrients for clear, glowing skin.",
    "Promotes Weight Loss: A low-calorie, naturally sweet alternative to sugary drinks.",
  ];

  return (
    <div className="benefits-section">
      <h2>Why Choose Sugarcane Juice?</h2>
      <p className="benefits-description">
        Sugarcane juice is more than just a refreshing drink! It's packed with
        numerous health benefits that make it a perfect choice for a healthy lifestyle.
      </p>
      <ul className="benefits-list">
        {benefitsList.map((benefit, index) => (
          <li key={index} className="benefit-item">
            <i className="benefit-icon">✔</i> {benefit}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Benefits;
