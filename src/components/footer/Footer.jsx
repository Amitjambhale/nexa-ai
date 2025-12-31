import React from "react";
import "./Footer.scss";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaChevronRight,
} from "react-icons/fa";
import FooterPowerby from "../../assets/icons/footer-powerby.png";
import { Link } from "react-router-dom";

const Footer = () => {
const year = new Date().getFullYear();
  return (
    <footer className="footer-main">
      {/* Floating Contact Section */}
      <div className="footer-contact-cards">
        <div className="footer-container">
          <div className="footer-card">
            <div className="footer-card-icon">
              <FaMapMarkerAlt />
            </div>
            <div className="footer-card-info">
              <h4>Visit Us</h4>
              <p>
                Vignaharta, Right Bhusari Colony, Near Runwal Samruddhi,
                Kothrud, Pune-411038, Maharashtra, India
              </p>
            </div>
          </div>

          <div
            className="footer-card"
            onClick={() => (window.location.href = "tel:+919881952606")}
          >
            <div className="footer-card-icon">
              <FaPhoneAlt />
            </div>
            <div className="footer-card-info">
              <h4>Call Us</h4>
              <p>+91 9881952606</p>
            </div>
          </div>

          <div
            className="footer-card"
            onClick={() =>
              (window.location.href = "mailto:assurreplus@gmail.com")
            }
          >
            <div className="footer-card-icon">
              <FaEnvelope />
            </div>
            <div className="footer-card-info">
              <h4>Email Us</h4>
              <p>assurreplus@gmail.com</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links Section */}
      <div className="footer-bottom-grid">
        <div className="footer-container">
          <div className="footer-column footer-brand">
            <h3 className="footer-logo-text">Assurre Plus</h3>
            <p>
              We are your trusted partner in life insurance and financial
              security, committed to delivering reliable solutions that
              safeguard your future. With integrity, professionalism, and expert
              guidance, we help you make informed decisions and secure long-term
              financial protection for you and your family.
            </p>
            <div className="footer-social-box">
              
              <a
                href="https://www.facebook.com/assurre.plus"
                target="_blank"
                rel="noreferrer"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://x.com/DillepPaatil?s=08"
                target="_blank"
                rel="noreferrer"
              >
                <FaTwitter />
              </a>
              <a
                href="https://www.instagram.com/dilleppaatil/?igshid=w28j695atkby"
                target="_blank"
                rel="noreferrer"
              >
                <FaInstagram />
              </a>
            </div>
          </div>

          <div className="footer-column">
            <h3>Important Links</h3>
            <ul>
              <li>
                <Link
                  to="https://customer.onlinelic.in/LICEPS/portlets/visitor/updateContact/UpdateContactController.jpf"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight /> Update Contact Details at LIC
                </Link>
              </li>
              <li>
                <Link
                  to="http://www.licindia.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight /> LIC of India
                </Link>
              </li>
              <li>
                <Link
                  to="http://ixforms.eshaansystems.com"
                  target="_new"
                  rel="noreferrer"
                >
                  <FaChevronRight /> LIC Forms
                </Link>
              </li>
              <li>
                <Link
                  to="https://ebiz.licindia.in/D2CPM/#DirectPay"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight /> LIC Premium - Pay Direct
                </Link>
              </li>
              <li>
                <Link
                  to="http://www.licindia.in/Customer-Services/Bonus-Information"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight /> LIC Bonus Information
                </Link>
              </li>
              <li>
                <Link
                  to="http://www.licindia.in/Customer-Services/Tax-Benefit"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight /> LIC Policy Income Tax Rule
                </Link>
              </li>
              <li>
                <Link
                  to="https://www.starhealth.in/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight /> Star Health Insurance
                </Link>
              </li>
              <li>
                <Link
                  to="https://licindia.in/Customer-Services/NRI-Center"
                  target="_blank"
                  rel="noreferrer"
                >
                  <FaChevronRight /> NRI Center
                </Link>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h3>Company</h3>
            <ul>
              <li>
                <Link to="/about-us">
                  <FaChevronRight /> About Us
                </Link>
              </li>
              <li>
                <Link to="/gallery">
                  <FaChevronRight /> Gallery
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaChevronRight /> News
                </Link>
              </li>
              <li>
                <Link to="/testimonials">
                  <FaChevronRight /> Testimonial
                </Link>
              </li>
              <li>
                <Link to="#">
                  <FaChevronRight /> Blog
                </Link>
              </li>
              <li>
                <Link to="/faq">
                  <FaChevronRight /> FAQ
                </Link>
              </li>
              <li>
                <Link to="/contact-us">
                  <FaChevronRight /> Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-copyright">
        <div className="footer-container">
          <p>
            Disclaimer |{" "}
            <a
              href="https://assurreplus.com/dc/privacypolicy.html"
              target="_blank"
              rel="noreferrer"
            >
              Privacy Policy
            </a>{" "}
          </p>
            <p>&copy; {year} Assurre Plus. All Rights Reserved.</p>
          {/* <div className="footer-powered">
            <span>Powered By</span>
            <a
              href="https://instrasoftsolutions.in/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={FooterPowerby} alt="Instrasoft" />
            </a>
          </div> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
