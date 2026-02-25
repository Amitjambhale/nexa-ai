import React from "react";
import { useLocation } from "react-router-dom";
import "./Footer.scss";
import {
  FaTwitter,
  FaInstagram,
  FaLinkedinIn,
  FaGithub,
  FaPaperPlane,
} from "react-icons/fa";

const Footer = () => {
  const year = new Date().getFullYear();
  const location = useLocation();

  // 🔥 HEADER HEIGHT + SAFE OFFSET (sticky header + spacing)
  const HEADER_OFFSET = 110;

  const scrollToSection = (sectionId) => {
    // Agar home page par nahi ho to pehle home par redirect
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }

    const element = document.getElementById(sectionId);

    if (element) {
      const y =
        element.getBoundingClientRect().top +
        window.pageYOffset -
        HEADER_OFFSET;

      window.scrollTo({
        top: y,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="saas-footer">
      {/* Background Animated Glows */}
      <div className="footer-glow-1"></div>
      <div className="footer-glow-2"></div>

      <div className="footer-container">
        {/* 🔥 Brand Section */}
        <div className="footer-col brand">
          <h2 className="logo-text">
            Nexa<span>AI</span>
          </h2>
          <p className="brand-desc">
            The world's most advanced AI-driven security infrastructure for modern SaaS teams.
            Protect your digital assets with neural intelligence.
          </p>

          <div className="social-group">
            <a href="https://github.com" target="_blank" rel="noreferrer" className="social-link">
              <FaGithub />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="social-link">
              <FaLinkedinIn />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-link">
              <FaTwitter />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-link">
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* 🚀 Navigation (FIXED SCROLL) */}
        <div className="footer-col links-col">
          <h3>Platform</h3>
          <ul className="footer-links">
            <li>
              <button onClick={() => scrollToSection("features")}>
                AI Features
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("pricing")}>
                Secure Plans
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("faq")}>
                Help Center
              </button>
            </li>
          </ul>
        </div>

        {/* 📚 Legal */}
        <div className="footer-col links-col">
          <h3>Legal</h3>
          <ul className="footer-links">
            <li>
              <button onClick={() => scrollToSection("privacy")}>
                Privacy Policy
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("terms")}>
                Terms of Service
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("security")}>
                Security Audit
              </button>
            </li>
            <li>
              <button onClick={() => scrollToSection("cookie")}>
                Cookie Policy
              </button>
            </li>
          </ul>
        </div>

        {/* 📩 Newsletter */}
        <div className="footer-col newsletter">
          <div className="newsletter-card">
            <h3>Stay Updated</h3>
            <p>Join 2,000+ teams receiving our neural security updates.</p>
            <div className="newsletter-box">
              <input type="email" placeholder="Your work email" />
              <button aria-label="Subscribe">
                <FaPaperPlane />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <div className="container-bottom">
          <p className="copyright">
            © {year} NexaAI Systems. Built for the future.
          </p>
          <div className="status-badge">
            <span className="dot"></span>
            <span className="status-text">All Systems Operational</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;