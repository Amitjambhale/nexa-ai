import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaPaperPlane } from "react-icons/fa";
import "./ContactUsPage.scss";

const ContactUsPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setTimeout(() => {
        setFormData({ name: "", email: "", phone: "", message: "" });
        setStatus("idle");
      }, 3000);
    }, 1500);
  };

  return (
    <section className="premium-contact" id="contact">
      <div className="contact-blur-1"></div>
      <div className="contact-blur-2"></div>

      <div className="container">
        <motion.div 
          className="contact-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <span className="contact-badge">Contact Support</span>
          <h2>Get in <span>Touch</span></h2>
          <p>Questions? Our support team will respond within 24 hours.</p>
        </motion.div>

        <div className="contact-grid">
          {/* LEFT - WIDE FORM CARD */}
          <motion.div 
            className="contact-form-card"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="card-header">
              <h3>Send a Message</h3>
              <div className="pulse-indicator"></div>
            </div>

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="input-group">
                  <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder=" " />
                  <label>Name</label>
                </div>
                <div className="input-group">
                  <input type="tel" name="phone" value={formData.phone} onChange={handleChange} maxLength={10} required placeholder=" " />
                  <label>Phone Number</label>
                </div>
              </div>

              <div className="input-group full-width">
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder=" " />
                <label>Email Address</label>
              </div>

              <div className="input-group full-width">
                <textarea name="message" rows="3" value={formData.message} onChange={handleChange} required placeholder=" "></textarea>
                <label>How can we help?</label>
              </div>

              <button type="submit" className={`submit-btn ${status}`} disabled={status !== "idle"}>
                {status === "idle" && (
                  <><span>Send Message</span><FaPaperPlane className="plane-icon" /></>
                )}
                {status === "submitting" && <div className="loader"></div>}
                {status === "success" && <span>Message Sent ✓</span>}
              </button>
            </form>
          </motion.div>

          {/* RIGHT - INFO STACK */}
          <motion.div 
            className="contact-info-stack"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="info-card-item">
              <div className="icon-wrapper"><FaPhoneAlt /></div>
              <div className="content"><label>Phone</label><p>+91 9999899998</p></div>
            </div>

            <div className="info-card-item">
              <div className="icon-wrapper"><FaEnvelope /></div>
              <div className="content"><label>Email</label><p>nextai@gmail.com</p></div>
            </div>

            <div className="info-card-item">
              <div className="icon-wrapper"><FaMapMarkerAlt /></div>
              <div className="content"><label>Location</label><p> India</p></div>
            </div>

            <div className="security-note">
              <div className="shield-icon">🛡️</div>
              <p>Data is encrypted using neural protocols. Secure and private.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactUsPage;