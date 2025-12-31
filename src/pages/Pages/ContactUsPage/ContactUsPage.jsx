import React from "react";
import { motion } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaShieldAlt,
  FaUserTie,
  FaGoogleDrive
} from "react-icons/fa";
import "./ContactUsPage.scss";

const ContactUsPage = () => {
  return (
    <div className="contactpage-premium-layout">
      <div className="contactpage-container">
        {/* HEADER SECTION */}
        <header className="contactpage-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="premium-tag">Assurre Plus</span>
            <h1>Connect with our <span>Experts.</span></h1>
            <p>Your security journey starts with a conversation.</p>
          </motion.div>
        </header>

        {/* TOP INTERACTION: FORM & INFO SIDE-BY-SIDE */}
        <div className="contactpage-upper-grid">
          <div className="contactpage-form-section">
            <h3 className="sub-heading">Send an Inquiry</h3>
            <form className="modern-form" onSubmit={(e) => e.preventDefault()}>
              <div className="input-row">
                <input type="text" placeholder="Your Name" required />
                <input type="tel" placeholder="Phone Number" required />
              </div>
              <input type="email" placeholder="Email Address" required />
              <textarea
                rows="8"
                placeholder="How can we assist you with your insurance needs?"
              ></textarea>
              <button className="submit-action-btn">
                SEND MESSAGE <FaArrowRight />
              </button>
            </form>
          </div>

          <div className="contactpage-info-section">
            <h3 className="sub-heading">Contact Details</h3>
            <div className="info-cards-stack">
              <a href="tel:+919881952606" className="clickable-info-box">
                <div className="icon-wrap"><FaPhoneAlt /></div>
                <div className="text-wrap">
                  <label>Direct Support</label>
                  <p>+91 9881952606</p>
                </div>
              </a>

              <a href="mailto:assurreplus@gmail.com" className="clickable-info-box">
                <div className="icon-wrap"><FaEnvelope /></div>
                <div className="text-wrap">
                  <label>Official Email</label>
                  <p>assurreplus@gmail.com</p>
                </div>
              </a>

              <div className="clickable-info-box no-hover">
                <div className="icon-wrap"><FaMapMarkerAlt /></div>
                <div className="text-wrap">
                  <label>Headquarters</label>
                  <p>Vignaharta, Bhusari Colony, Kothrud, Pune-38</p>
                </div>
              </div>
            </div>

            <div className="features-strip">
              <div className="feature"><FaClock /> <span>24/7 Response</span></div>
              <div className="feature"><FaShieldAlt /> <span>Secure Handling</span></div>
              <div className="feature"><FaUserTie /> <span>Expert Advice</span></div>
            </div>
          </div>
        </div>

        {/* MAP SECTION - Restructured with Title on Top */}
        <section className="map-grand-section">
          <div className="map-title-area">
             <h2>Find Us on <span>Google Maps</span></h2>
             <div className="title-line"></div>
          </div>
          
          <div className="contactus-map-container">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1891.7078807292678!2d73.78797411072102!3d18.51010482962491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1e1f4cda279%3A0x2776a45ea65b97af!2sAssurrePlus!5e0!3m2!1sen!2sin!4v1767087044756!5m2!1sen!2sin"
            width="100%"
            height="450"
              className="contactus-map"
            allowfullscreen=""
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
}

export default ContactUsPage;