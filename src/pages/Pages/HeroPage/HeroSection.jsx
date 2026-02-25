import React from "react";
import { motion } from "framer-motion";
import { FaArrowRight, FaFingerprint, FaShieldAlt, FaLock } from "react-icons/fa";
import "./HeroSection.scss";

const HeroSection = () => {
  return (
    <section className="premium-hero">
      {/* Dynamic Background Elements */}
      <div className="bg-blur-circle p1"></div>
      <div className="bg-blur-circle p2"></div>
      <div className="grid-overlay"></div>

      <div className="container">
        <div className="hero-grid">
          {/* LEFT CONTENT */}
          <motion.div
            className="hero-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <div className="hero-badge">
              <span className="dot"></span>
              Next-Gen AI Security
            </div>

            <h1>
              Protect Your <br />
              <span>Digital Empire</span> <br />
              With Neural AI.
            </h1>

            <p>
              Automated military-grade encryption for modern SaaS teams.
              Real-time threat detection powered by Nexa Neural Engine.
            </p>

            <div className="hero-actions">
              <button className="btn-main">Get Started Now</button>
              <button className="btn-ghost">
                View Architecture <FaArrowRight />
              </button>
            </div>
          </motion.div>

          {/* RIGHT VISUAL */}
          <motion.div
            className="hero-right"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <div className="glass-card-wrapper">
              {/* Floating Mini Icons */}
              <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 4, repeat: Infinity }} className="float-icon i1"><FaShieldAlt /></motion.div>
              <motion.div animate={{ y: [0, 12, 0] }} transition={{ duration: 5, repeat: Infinity }} className="float-icon i2"><FaLock /></motion.div>

              <div className="glass-card">
                <div className="card-top">
                  <div className="biometric-icon">
                    <FaFingerprint />
                  </div>
                  <div className="text-group">
                    <h4>Vault Protocol 7.0</h4>
                    <p>Status: <span className="secure">Ultra-Secure</span></p>
                  </div>
                </div>

                <div className="card-body">
                  <div className="stat-line">
                    <span>Threat Detection</span>
                    <div className="progress-bar"><div className="fill"></div></div>
                  </div>
                  <div className="stat-line">
                    <span>Neural Scanning</span>
                    <div className="progress-bar"><div className="fill p2"></div></div>
                  </div>
                </div>

                <div className="card-bottom">
                  <div className="live-badge">Live System Feed</div>
                  <div className="graph-lines">
                    <span></span><span></span><span></span><span></span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;