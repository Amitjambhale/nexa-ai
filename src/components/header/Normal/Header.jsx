import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaRegCheckCircle, FaChevronRight, FaTimes } from "react-icons/fa";
import { HiBars3BottomRight } from "react-icons/hi2";
import "./Header.scss";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  const location = useLocation();
  const navigate = useNavigate();

  const HEADER_HEIGHT = 80;

  // 1. Sticky Header Logic
  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🚀 2. SMART SCROLL LOGIC (The Fix)
  // Yeh hook check karta hai ki kya URL mein '#' hai, agar hai toh wahan scroll karta hai
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      
      if (element) {
        // Thoda delay taaki DOM puri tarah load ho jaye
        const timer = setTimeout(() => {
          const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT;
          window.scrollTo({ top: offsetPosition, behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    }
  }, [location]); // Jab bhi location change hogi, yeh chalega

  const openModal = () => {
    setIsModalOpen(true);
    setIsMenuOpen(false);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "unset";
  };

  // 🔥 3. NAVIGATION HANDLER
  const handleNavClick = (link) => {
    setIsMenuOpen(false);

    // Case A: Agar Link ek alag Page hai (About Us)
    if (link.path) {
      navigate(link.path);
      window.scrollTo(0, 0); // Naye page par top par le jao
      return;
    }

    // Case B: Agar hum kisi aur page par hain aur Home ke section par jana hai
    if (location.pathname !== "/") {
      navigate(`/#${link.id}`); // Yeh URL change karega, useEffect scroll handle karega
      return;
    }

    // Case C: Agar hum Home par hi hain, toh direct smooth scroll
    const element = document.getElementById(link.id);
    if (element) {
      const offsetPosition = element.getBoundingClientRect().top + window.pageYOffset - HEADER_HEIGHT;
      window.scrollTo({ top: offsetPosition, behavior: "smooth" });
    }
  };

  const navLinks = [
    { name: "Features", id: "features" },
    { name: "Pricing", id: "pricing" },
    { name: "About Us", path: "/about-us" },
    { name: "FAQ", id: "faq" },
    { name: "Testimonials", id: "testimonials" },
  ];

  return (
    <>
      <header className={`saas-header ${isSticky ? "sticky" : ""}`}>
        <div className="nav-container">
          <Link to="/" className="logo">
            <img src="/nexa-ai.png" alt="Logo" />
            <span>NexaAI</span>
          </Link>

          <nav className="desktop-nav">
            {navLinks.map((link) => (
              <button key={link.name} className="nav-link" onClick={() => handleNavClick(link)}>
                {link.name}
              </button>
            ))}
          </nav>

          <div className="cta-wrapper">
            <button className="cta-btn" onClick={openModal}>
              Get Started <FaChevronRight className="icon-arrow" />
            </button>
          </div>

          <div className="menu-toggle-box" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            <HiBars3BottomRight className={`toggle-icon ${isMenuOpen ? "active" : ""}`} />
          </div>
        </div>
      </header>

      {/* 🚀 PREMIUM MODAL */}
      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="glow-top"></div>
            <button className="close-btn" onClick={closeModal}><FaTimes /></button>
            <div className="modal-header">
              <div className="badge">Beta Access Now Open</div>
              <h2>Secure Your <br /> <span>Digital Assets</span></h2>
              <p>Join the elite waitlist for our next-gen AI protection suite.</p>
            </div>
            <form className="modal-form" onSubmit={(e) => { e.preventDefault(); alert("Welcome to the waitlist!"); closeModal(); }}>
              <div className="input-group">
                <FaEnvelope className="input-icon" />
                <input type="email" placeholder="Enter your work email" required />
              </div>
              <button type="submit" className="submit-btn">Join the Waitlist</button>
            </form>
            <div className="modal-footer">
              <FaRegCheckCircle className="check-icon" />
              <span>No credit card required • GDPR Compliant</span>
            </div>
          </div>
        </div>
      )}

      {/* MOBILE MENU */}
      <div className={`mobile-menu ${isMenuOpen ? "active" : ""}`}>
        {navLinks.map((link) => (
          <button key={link.name} className="mobile-link" onClick={() => handleNavClick(link)}>
            {link.name}
          </button>
        ))}
        <button className="mobile-cta" onClick={openModal}>Get Started</button>
      </div>
    </>
  );
};

export default Header;