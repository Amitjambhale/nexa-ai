import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaArrowRight } from "react-icons/fa";
import "./CTASection.scss";

const CTASection = () => {
  return (
    <section className="premium-cta">
      <div className="cta-glow-bg"></div>

      <div className="container">
        <motion.div
          className="cta-card"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Left Content */}
          <div className="cta-content">
            <span className="cta-tag">
              <FaRocket /> Launch Your SaaS Faster
            </span>

            <h2>
              Ready to Build a <span>Premium SaaS Website</span> in Minutes?
            </h2>

            <p>
              Get this modern AI SaaS landing page template with premium UI,
              animations, and fully responsive design. Perfect for startups.
            </p>

            <div className="cta-buttons">
              <button className="primary-btn">
                Get Template <FaArrowRight />
              </button>
              <button className="secondary-btn">
                View Demo
              </button>
            </div>
          </div>

          {/* Right Visual Animation */}
          <div className="cta-visual">
            <div className="orbit">
              <div className="circle"></div>
              <div className="circle small"></div>
              <div className="circle glow"></div>

              <div className="core-icon">
                <FaRocket className="rocket-icon" />
                <div className="core-glow"></div>
              </div>

              <div className="particle p1"></div>
              <div className="particle p2"></div>
              <div className="particle p3"></div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTASection;