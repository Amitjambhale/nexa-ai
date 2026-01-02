import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaShieldAlt, FaChevronDown, FaChevronUp, FaHome, 
  FaInfoCircle, FaImages, FaNewspaper, FaRss, 
  FaComments, FaQuestionCircle, FaPhoneAlt, FaFileInvoiceDollar 
} from "react-icons/fa";
import Topbar from "./Topbar";
import HeaderLogo from "../../../assets/icons/assureplus-logo-1.png";
import { getParentDropdown } from "services/home/PagesApis/pages";
import "./Header.scss";

const Header = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isInsuranceOpen, setIsInsuranceOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [insurancePlans, setInsurancePlans] = useState([]);
  const location = useLocation();
  const hoverTimeoutRef = useRef(null);

  const navLinks = [
    { name: "Home", path: "/", icon: <FaHome /> },
    { name: "About Us", path: "/about-us", icon: <FaInfoCircle /> },
    { name: "Gallery", path: "/gallery", icon: <FaImages /> },
    { name: "News", path: "/news", icon: <FaNewspaper /> },
    { name: "Blogs", path: "/blogs", icon: <FaRss /> },
    { name: "Testimonials", path: "/testimonials", icon: <FaComments /> },
    { name: "FAQ", path: "/faq", icon: <FaQuestionCircle /> },
    { name: "Contact Us", path: "/contact-us", icon: <FaPhoneAlt /> },
  ];

  // Fetch Insurance Plans from API
  useEffect(() => {
    const fetchInsurancePlans = async () => {
      try {
        const res = await getParentDropdown();
        if (res.code === 200 && res.data && res.data.products) {
          setInsurancePlans(res.data.products);
        }
      } catch (err) {
        console.error("Failed to fetch insurance plans:", err);
      }
    };
    fetchInsurancePlans();
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsSticky(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const handleMouseEnter = () => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    hoverTimeoutRef.current = setTimeout(() => {
      setIsHovered(false);
    }, 0);
  };

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const closeMenu = () => {
    setIsMenuOpen(false);
    setIsInsuranceOpen(false);
  };

  // Helper to format path (Slugify)
  const getProductPath = (title) => {
    return `/services/${title.toLowerCase().replace(/\s+/g, "-")}`;
  };

  return (
    <>
      <div className={`nav-overlay ${isMenuOpen ? "active" : ""}`} onClick={closeMenu} />

      <div className={`topbar-wrapper ${isSticky ? "topbar-hidden" : ""}`}>
        <Topbar />
      </div>

      <header className={`main-header-v2 ${isSticky ? "is-sticky" : ""}`}>
        <div className="nav-container">
          <div className="logo-section">
            <Link to="/" onClick={closeMenu}>
              <img src={HeaderLogo} alt="Assurre Plus" />
            </Link>
          </div>

          <nav className="desktop-nav">
            <ul className="nav-list">
              <li><Link to="/" className={`nav-item ${location.pathname === "/" ? "active" : ""}`}>Home</Link></li>
              <li><Link to="/about-us" className={`nav-item ${location.pathname === "/about-us" ? "active" : ""}`}>About Us</Link></li>

              {/* 🔹 Conditionally Render Life Insurance Dropdown */}
              {insurancePlans.length > 0 && (
                <li 
                  className={`nav-item dropdown-parent ${isHovered ? "is-open" : ""}`}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                >
                  <span className="nav-link-text">
                    Life Insurance <FaChevronDown className="chev-icon" />
                  </span>
                  
                  <div className="mega-dropdown">
                    <div className="dropdown-grid">
                      {insurancePlans.map((plan) => (
                        <Link 
                          key={plan.ProductID} 
                          to={getProductPath(plan.ProductTitle)} 
                          className="dropdown-link" 
                          onClick={() => setIsHovered(false)}
                        >
                          <FaShieldAlt className="shield-icon" />
                          {plan.ProductTitle}
                        </Link>
                      ))}
                    </div>
                  </div>
                </li>
              )}

              {navLinks.slice(2).map((link) => (
                <li key={link.path}>
                  <Link to={link.path} className={`nav-item ${location.pathname === link.path ? "active" : ""}`}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className={`mobile-toggle-btn ${isMenuOpen ? "open" : ""}`} onClick={toggleMenu}>
            <span></span><span></span><span></span>
          </div>

          <aside className={`mobile-sidebar ${isMenuOpen ? "side-active" : ""}`}>
            <div className="sidebar-inner">
              <div className="sidebar-header">
                <h3>Assurre Plus</h3>
                <p>Sincerity • Security • Trust</p>
              </div>
              
              <ul className="mobile-nav-list">
                <li className={isMenuOpen ? "fade-in" : ""}>
                  <Link to="/" onClick={closeMenu}>
                    <span className="side-icon">{navLinks[0].icon}</span> {navLinks[0].name}
                  </Link>
                </li>
                <li className={isMenuOpen ? "fade-in" : ""}>
                  <Link to="/about-us" onClick={closeMenu}>
                    <span className="side-icon">{navLinks[1].icon}</span> {navLinks[1].name}
                  </Link>
                </li>

                {/* 🔹 Conditionally Render Mobile Accordion */}
                {insurancePlans.length > 0 && (
                  <li className={`mobile-accordion ${isMenuOpen ? "fade-in" : ""}`}>
                    <button className="accordion-btn" onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}>
                      <div className="btn-label">
                        <span className="side-icon"><FaFileInvoiceDollar /></span> Life Insurance
                      </div>
                      {isInsuranceOpen ? <FaChevronUp /> : <FaChevronDown />}
                    </button>
                    <div className={`accordion-content ${isInsuranceOpen ? "active" : ""}`}>
                      {insurancePlans.map((plan) => (
                        <Link key={plan.ProductID} to={getProductPath(plan.ProductTitle)} onClick={closeMenu}>
                          <FaShieldAlt className="shield-icon" /> {plan.ProductTitle}
                        </Link>
                      ))}
                    </div>
                  </li>
                )}

                {navLinks.slice(2).map((link, index) => (
                  <li key={link.path} className={isMenuOpen ? "fade-in" : ""} style={{ transitionDelay: `${(index + 3) * 0.05}s` }}>
                    <Link to={link.path} onClick={closeMenu}>
                      <span className="side-icon">{link.icon}</span> {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </header>
    </>
  );
};

export default Header;