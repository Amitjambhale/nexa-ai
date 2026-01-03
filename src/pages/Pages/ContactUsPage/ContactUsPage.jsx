import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaArrowRight,
  FaClock,
  FaShieldAlt,
  FaUserTie,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
import { addContactUs } from "services/home/PagesApis/pages";
import "./ContactUsPage.scss";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    emailid: "",
    mobile: "",
    comment: "",
  });

  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await addContactUs(formData);
      if (res.code === 200) {
        setStatus("success");
        setFormData({ name: "", emailid: "", mobile: "", comment: "" });
        setTimeout(() => setStatus("idle"), 5000);
      } else {
        setStatus("error");
        setTimeout(() => setStatus("idle"), 4000);
      }
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  return (
    <div className="contactpage-premium-layout">
      <div className="contactpage-container">
        <AnimatePresence>
          {status !== "idle" && status !== "loading" && (
            <motion.div
              className={`status-overlay ${status}`}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
            >
              <div className="overlay-content">
                {status === "success" ? (
                  <>
                    <FaCheckCircle className="status-icon" />
                    <h2>Message Received!</h2>
                    <p>
                      Thank you for reaching out. Our experts will contact you
                      shortly.
                    </p>
                  </>
                ) : (
                  <>
                    <FaTimesCircle className="status-icon" />
                    <h2>Something Went Wrong</h2>
                    <p>
                      We couldn't process your request right now. Please try
                      again later.
                    </p>
                  </>
                )}
                <button onClick={() => setStatus("idle")}>Close</button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <header className="contactpage-header">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="premium-tag">Assurre Plus</span>
            <h1>
              Connect with our <span>Experts.</span>
            </h1>
            <p>Your security journey starts with a conversation.</p>
          </motion.div>
        </header>

        <div className="contactpage-upper-grid">
          <div className="contactpage-form-section">
            <h3 className="sub-heading">Send an Inquiry</h3>
            <form className="modern-form" onSubmit={handleSubmit}>
              <div className="input-row">
                <input
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
                <input
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="Phone Number"
                  required
                />
              </div>

              <input
                name="emailid"
                type="email"
                value={formData.emailid}
                onChange={handleChange}
                placeholder="Email Address"
                required
              />

              <textarea
                name="comment"
                value={formData.comment}
                onChange={handleChange}
                rows="6"
                placeholder="How can we assist you with your insurance needs?"
                required
              ></textarea>

              <button
                className="submit-action-btn"
                disabled={status === "loading"}
              >
                {status === "loading" ? "SENDING..." : "SEND MESSAGE"}{" "}
                <FaArrowRight />
              </button>
            </form>
          </div>

          <div className="contactpage-info-section">
            <h3 className="sub-heading">Contact Details</h3>
            <div className="info-cards-stack">
              <a href="tel:+919881952606" className="clickable-info-box">
                <div className="icon-wrap">
                  <FaPhoneAlt />
                </div>
                <div className="text-wrap">
                  <label>Direct Support</label>
                  <p>+91 9881952606</p>
                </div>
              </a>

              <a
                href="mailto:assurreplus@gmail.com"
                className="clickable-info-box"
              >
                <div className="icon-wrap">
                  <FaEnvelope />
                </div>
                <div className="text-wrap">
                  <label>Official Email</label>
                  <p>assurreplus@gmail.com</p>
                </div>
              </a>

              <div className="clickable-info-box no-hover">
                <div className="icon-wrap">
                  <FaMapMarkerAlt />
                </div>
                <div className="text-wrap">
                  <label>Headquarters</label>
                  <p>Vignaharta, Bhusari Colony, Kothrud, Pune-38</p>
                </div>
              </div>
            </div>

            <div className="features-strip">
              <div className="feature">
                <FaClock /> <span>24/7 Response</span>
              </div>
              <div className="feature">
                <FaShieldAlt /> <span>Secure Handling</span>
              </div>
              <div className="feature">
                <FaUserTie /> <span>Expert Advice</span>
              </div>
            </div>
          </div>
        </div>

        <section className="map-grand-section">
          <div className="map-title-area">
            <h2>
              Find Us on <span>Google Maps</span>
            </h2>
            <div className="title-line"></div>
          </div>
          <div className="contactus-map-container">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.417392092972!2d73.78647207509766!3d18.51003106949628!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2c1e1f4cda279%3A0x2776a45ea65b97af!2sAssurrePlus!5e0!3m2!1sen!2sin!4v1767418029111!5m2!1sen!2sin"
              width="100%"
              height="450"
              className="contactus-map"
              allowFullScreen=""
              loading="lazy"
            ></iframe>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactUsPage;
