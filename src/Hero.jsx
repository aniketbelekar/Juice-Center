import React from 'react';
import './Hero.css';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section">
      <div className="hero-text">
        <h1 className="fade-in">Cool, Crisp, and 100% Natural Sugarcane Juice</h1>
        <p className="slide-in">
          Experience the natural sweetness and health benefits of freshly pressed
          sugarcane juice. Packed with energy, vitamins, and a burst of refreshing
          flavor, our juice is the perfect choice for a revitalizing break. Sip on
          nature’s best and feel the freshness in every drop.
        </p>
        <blockquote className="slide-in">
          <p>"Cool down, sweeten up, and boost your wellness with pure sugarcane juice."</p>
        </blockquote>
      </div>
      <div className="hero-video">
        <video autoPlay loop muted className="zoom-in">
          <source src="public/sugarcane video.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
    </section>
  );
};

export default HeroSection;
