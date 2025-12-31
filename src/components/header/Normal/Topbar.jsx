import React from 'react';
import './Topbar.scss';
import { FaPhoneAlt, FaEnvelope, FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Topbar = () => {
  return (
    <div className="topbar-wrapper">
      <div className="topbar-container">
        <div className="topbar-contact">
          <a href="tel:9881952606" className="topbar-link">
            <FaPhoneAlt className="topbar-icon" /> 
            <span className="topbar-text">+91 9881952606</span>
          </a>
          
          <span className="topbar-divider">|</span>
          
          <a href="mailto:assurreplus@gmail.com" className="topbar-link">
            <FaEnvelope className="topbar-icon" /> 
            <span className="topbar-text">assurreplus@gmail.com</span>
          </a>
        </div>

        <div className="topbar-socials">
          <a href="https://www.facebook.com/assurre.plus" target='_new' className="topbar-social-link"><FaFacebookF /></a>
          <a href="https://x.com/DillepPaatil?s=08" target='_new' className="topbar-social-link"><FaTwitter /></a>
          <a href="https://www.instagram.com/dilleppaatil/?igshid=w28j695atkby" target='_new'className="topbar-social-link"><FaInstagram /></a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;