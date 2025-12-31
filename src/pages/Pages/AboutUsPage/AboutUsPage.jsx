import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaAward, FaLock, FaBullseye, FaCheckCircle, FaStar, FaHandHoldingHeart, FaCrown, FaUsers, FaFileInvoiceDollar, FaGlobeAmericas } from "react-icons/fa";
import DileepImg from "../../../assets/icons/about-us.jpeg";
import "./AboutUsPage.scss";

const AboutUsPage = () => {
  const achievements = [
    { title: "Corporate Trophy", sub: "Winner Excellence", icon: <FaAward /> },
    { title: "Champion Trophy", sub: "Top Performer", icon: <FaCrown /> },
    { title: "+1500 Families", sub: "Trusted Partner", icon: <FaUsers /> },
    { title: "+1600 Policies", sub: "Service Excellence", icon: <FaFileInvoiceDollar /> },
    { title: "MDRT - 3 Times", sub: "Highest International Recognition", icon: <FaGlobeAmericas /> },
    { title: "Triple Crown", sub: "Shatakveer Honours", icon: <FaStar /> },
  ];

  return (
    <div className="aboutpage-wrapper">
      {/* --- HERO SECTION --- */}
      <section className="aboutpage-hero">
        <div className="aboutpage-container">
          <div className="aboutpage-hero-grid">
            <motion.div 
              className="aboutpage-hero-text"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <div className="aboutpage-tag">WELCOME TO ASSURRE PLUS</div>
              <h1>Mr. Dillep <span>Paatil</span></h1>
              <p className="aboutpage-intro">
                Providing unmatched insurance & investment solutions to build your secure future. 
                Expertise and 100% commitment to your financial goals.
              </p>
              <div className="aboutpage-hero-stats">
                <div className="stat"><b>13+</b><span>Years</span></div>
                <div className="stat"><b>1500+</b><span>Clients</span></div>
                <div className="stat"><b>1600+</b><span>Policies</span></div>
              </div>
            </motion.div>

            <motion.div 
              className="aboutpage-hero-visual"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="aboutpage-image-mask">
                <img src={DileepImg} alt="Dileep Paatil" />
                <div className="aboutpage-experience-blob">
                  <FaStar /> Professional Excellence
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- IDENTITY & MISSION SLABS --- */}
      <section className="aboutpage-mission-section">
        <div className="aboutpage-container">
          <div className="aboutpage-mission-grid">
            <motion.div className="aboutpage-slab" whileInView={{ y: [40, 0], opacity: [0, 1] }} viewport={{ once: true }}>
              <div className="slab-icon"><FaBullseye /></div>
              <h3>Our Mission</h3>
              <p>“Improving people’s financial security”. That’s it! Assurre Plus was started with the simple purpose of strengthening your life through security.</p>
            </motion.div>

            <motion.div className="aboutpage-slab dark" whileInView={{ y: [40, 0], opacity: [0, 1] }} viewport={{ once: true }}>
              <div className="slab-icon"><FaHandHoldingHeart /></div>
              <h3>Why We Are Different</h3>
              <p>With us, it’s all about the client. We work in sync to understand short & long term goals, suggesting rewards of planned investments.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- NEW ACHIEVEMENT BENTO GRID --- */}
      <section className="aboutpage-achievements-new">
        <div className="aboutpage-container">
          <div className="aboutpage-section-title">
            <span>Our Wall of Honor</span>
            <h2>Milestones of Excellence</h2>
          </div>
          <div className="aboutpage-bento-grid">
            {achievements.map((item, i) => (
              <motion.div 
                key={i} 
                className="aboutpage-bento-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                viewport={{ once: true }}
              >
                <div className="bento-icon">{item.icon}</div>
                <div className="bento-info">
                  <h4>{item.title}</h4>
                  <p>{item.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- NEW FUTURE PROOF VAULT DESIGN --- */}
      <section className="aboutpage-future-vault-new">
        <div className="aboutpage-container">
          <motion.div 
            className="aboutpage-glass-vault"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <div className="vault-decoration">
              <div className="ring-1"></div>
              <div className="ring-2"></div>
            </div>

            <div className="vault-content">
              <div className="vault-icon-header">
                <FaLock className="lock-icon" />
              </div>
              <h3>Future-Proof Your Life</h3>
              <p>
                We are as committed to your goals as you yourself are. We look forward to 
                <strong> Risk-proofing your life</strong> so that you & your loved ones can 
                make the most of your accumulated wealth.
              </p>
              
              <div className="aboutpage-signature-box">
                <div className="line"></div>
                <h4>Dillep Paatil</h4>
                <p>Expert Financial Advisor</p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default AboutUsPage;