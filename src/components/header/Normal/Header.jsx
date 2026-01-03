import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  FaShieldAlt, FaChevronDown, FaChevronUp, FaHome, 
  FaInfoCircle, FaImages, FaNewspaper, FaRss, 
  FaComments, FaQuestionCircle, FaPhoneAlt, FaFileInvoiceDollar,
  FaExclamationCircle
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

  // Helper to format path
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

              {/* 🔹 Life Insurance Dropdown */}
              <li 
                className={`nav-item dropdown-parent ${isHovered ? "is-open" : ""}`}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
              >
                <span className="nav-link-text">
                  Life Insurance <FaChevronDown className="chev-icon" />
                </span>
                
                <div className="mega-dropdown">
                  {insurancePlans.length > 0 ? (
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
                  ) : (
                    <div className="no-data-dropdown">
                      <FaExclamationCircle className="info-icon" />
                      <p>No insurance plans found this time.</p>
                      <span>Check back later for new updates.</span>
                    </div>
                  )}
                </div>
              </li>

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
              <ul className="mobile-nav-list">
                <li className={isMenuOpen ? "fade-in" : ""}>
                  <Link to="/" onClick={closeMenu}>
                    <div className="side-icon">{navLinks[0].icon}</div>
                    <span className="link-text">{navLinks[0].name}</span>
                  </Link>
                </li>
                <li className={isMenuOpen ? "fade-in" : ""}>
                  <Link to="/about-us" onClick={closeMenu}>
                    <div className="side-icon">{navLinks[1].icon}</div>
                    <span className="link-text">{navLinks[1].name}</span>
                  </Link>
                </li>

                {/* 🔹 Mobile Accordion */}
                <li className={`mobile-accordion ${isMenuOpen ? "fade-in" : ""}`}>
                  <button className="accordion-btn" onClick={() => setIsInsuranceOpen(!isInsuranceOpen)}>
                    <div className="btn-label-wrapper">
                      <div className="side-icon"><FaFileInvoiceDollar /></div>
                      <span className="link-text">Life Insurance</span>
                    </div>
                    {isInsuranceOpen ? <FaChevronUp className="arrow-icon" /> : <FaChevronDown className="arrow-icon" />}
                  </button>
                  <div className={`accordion-content ${isInsuranceOpen ? "active" : ""}`}>
                    {insurancePlans.length > 0 ? (
                      insurancePlans.map((plan) => (
                        <Link key={plan.ProductID} to={getProductPath(plan.ProductTitle)} onClick={closeMenu}>
                          <FaShieldAlt className="shield-icon" /> {plan.ProductTitle}
                        </Link>
                      ))
                    ) : (
                      <div className="no-data-mobile">
                        <p>No plans found this time.</p>
                      </div>
                    )}
                  </div>
                </li>

                {navLinks.slice(2).map((link, index) => (
                  <li key={link.path} className={isMenuOpen ? "fade-in" : ""} style={{ transitionDelay: `${(index + 3) * 0.05}s` }}>
                    <Link to={link.path} onClick={closeMenu}>
                      <div className="side-icon">{link.icon}</div>
                      <span className="link-text">{link.name}</span>
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