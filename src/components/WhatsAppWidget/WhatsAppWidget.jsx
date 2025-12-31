import React from "react";
import { FaWhatsapp } from "react-icons/fa";
import "./WhatsAppWidget.scss";

const WhatsAppWidget = () => {
  const phoneNumber = "919881952606";
  const message = "Hello Assurre Plus, I'm interested in your insurance services.";

  const openWhatsApp = () => {
    window.open(`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="wa-floating-container" onClick={openWhatsApp}>
      {/* Tooltip/Label */}
      <div className="wa-tooltip">Let's Connect</div>
      
      {/* Pulse Rings for Animation */}
      <div className="wa-pulse-ring"></div>
      
      {/* Main Button */}
      <div className="wa-main-btn">
        <FaWhatsapp />
      </div>
    </div>
  );
};

export default WhatsAppWidget;