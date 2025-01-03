import React from "react";
import "./Footer.css";

const Footer = ({ cartData = [] }) => {
  // Function to calculate total price
  const calculateTotalPrice = () => {
    // Make sure cartData is not empty and has valid items
    if (cartData.length === 0) return 0;

    return cartData.reduce((total, item) => {
      // Ensure the price is a number by removing the '₹' symbol and converting to float
      const price = parseFloat(item.price.replace('₹', '').trim());
      
      // If price is NaN, log an error
      if (isNaN(price)) {
        console.error("Invalid price for item:", item);
        return total;
      }

      // Multiply price by quantity and accumulate the total
      return total + (price * item.quantity);
    }, 0);
  };

  const handleWhatsAppRedirect = () => {
    const phoneNumber = "918010943543"; // Replace with your WhatsApp number in international format

    // Format the WhatsApp message
    let message = `Hello, I would like to place an order:\n\n`;

    // Add cart items
    cartData.forEach((item, index) => {
      message += `${index + 1}. ${item.name} - Quantity: ${item.quantity}, Price: ₹${item.price}\n`;
    });

    // Add total price
    const totalPrice = calculateTotalPrice();
    message += `\nTotal Price: ₹${totalPrice.toFixed(2)}`;

    // Add cart options to the message
    message += `\n\nI would like to know the availability and delivery options for the above items.`;

    // Debugging the message
    console.log("WhatsApp Message:", message);

    // Encode message for WhatsApp
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    // Redirect to WhatsApp with the message
    window.open(whatsappUrl, "_blank");
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        {/* Shop Information */}
        <div className="footer-logo">
          <h3>Our Shop Location: Ramshewadkar Parisar Wani: 445304</h3>
          <h4>
            Gmail: delightsugarcane@gmail.com
            <p>Contact No: 8010943543</p>
          </h4>
        </div>

        {/* Social Media Section */}
        <div className="footer-social">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="fab fa-facebook-f"></i>
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="fab fa-twitter"></i>
          </a>
          <a
            href="https://www.instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-icon"
          >
            <i className="fab fa-instagram"></i>
          </a>
          <button
            className="whatsapp-icon"
            onClick={handleWhatsAppRedirect}
            aria-label="WhatsApp"
          >
            <i className="fab fa-whatsapp"></i>
          </button>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="footer-bottom">
        <p>&copy; 2024. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
