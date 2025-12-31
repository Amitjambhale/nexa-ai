import React from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaWhatsapp, FaArrowRight } from "react-icons/fa";
import DileepImg from "../../../assets/icons/about-us.jpeg";
import "./AboutSection.scss";
import { useNavigate } from "react-router-dom";

const AboutSection = () => {
  const navigate = useNavigate();
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="aboutsection-main">
      {/* Background Decor */}
      <div className="aboutsection-bg-shape"></div>
      
      <div className="aboutsection-container">
        <motion.div 
          className="aboutsection-content-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Left: Premium Image Layout */}
          <motion.div className="aboutsection-image-side" variants={fadeInUp}>
            <div className="aboutsection-image-box">
              <div className="aboutsection-experience-badge">
                <span className="years">13+</span>
                <span className="text">Years of Experience</span>
              </div>
              <img src={DileepImg} alt="Mr. Dileep Paatil" className="main-img" />
              <div className="border-element"></div>
            </div>
          </motion.div>

          {/* Right: Elegant Text Content */}
          <motion.div className="aboutsection-text-side" variants={fadeInUp}>
            <div className="aboutsection-tagline">
              <span className="line"></span>
              <span className="tag">WHO WE ARE</span>
            </div>
            
            <h2 className="aboutsection-title">
              Mr. <span>Dillep Paatil</span>
            </h2>
            
            <div className="aboutsection-description">
              <p className="highlight-para">
                At Assurre Plus, we provide you with unmatched insurance & investment solutions 
                and support to build your secure future.
              </p>
              <p>
                Options, flexibility, support, expertise and 100% commitment to our client's 
                financial goals are just some of the benefits you'll enjoy. Assurre Plus is 
                different as with us it's all about the client.
              </p>
              <p>
                We are committed to the financial goals of all our clients and make sure that 
                their current and future savings requirements are met. Our specialists ensure 
                you get nothing but the best advice.
              </p>
            </div>

            <div className="aboutsection-footer">
              <motion.button 
                className="aboutsection-cta"
                whileHover={{ x: 5 }}
                onClick={()=>navigate("/about-us")}
              >
                Learn More <FaArrowRight />
              </motion.button>

              <div className="aboutsection-social-wrap">
                <span className="social-label">Follow Us:</span>
                <div className="social-links">
                  <a href="https://twitter.com/share?url=https%3A%2F%2Fassurreplus.com%2Fabout" target="_blank" className="s-link"><FaTwitter /></a>
                  <a href="https://facebook.com/sharer/sharer.php?u=https%3A%2F%2Fassurreplus.com%2Fabout"target="_blank" className="s-link"><FaFacebookF /></a>
                  <a href="https://www.linkedin.com/shareArticle?mini=true&url=https%3A%2F%2Fassurreplus.com%2Fabout" target="_blank" className="s-link"><FaLinkedinIn /></a>
                  <a href="whatsapp://send?text=https%3A%2F%2Fassurreplus.com%2Fabout" target="_blank" className="s-link"><FaWhatsapp /></a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;