import React from "react";
import { FaInbox, FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./EmptyState.scss";

const EmptyState = ({ 
  title = "No Data Found", 
  message = "We couldn't find what you were looking for. Please check back later.",
  showButton = true,
  buttonText = "Back to Home"
}) => {
  const navigate = useNavigate();

  return (
    <div className="empty-minimal-container">
      <div className="empty-content-flow">
        {/* Animated Icon Section */}
        <div className="empty-visual-anchor">
          <div className="empty-ring-outer"></div>
          <div className="empty-ring-inner"></div>
          <FaInbox className="empty-icon-main" />
        </div>
        
        {/* Text Section */}
        <div className="empty-text-stack">
          <h2 className="empty-head">{title}</h2>
          <p className="empty-sub">{message}</p>
        </div>

        {/* Action Section */}
        {showButton && (
          <button className="empty-action-link" onClick={() => navigate("/")}>
            <span className="empty-btn-text">{buttonText}</span>
            <FaArrowLeft className="empty-btn-icon" />
          </button>
        )}
      </div>
    </div>
  );
};

export default EmptyState;