import React from "react";
import { motion } from "framer-motion";
import { FaUsers, FaLightbulb, FaGlobe, FaAward } from "react-icons/fa";
import "./AboutUsPage.scss";

const stats = [
  { id: 1, label: "Global Users", value: "2.5M+", icon: <FaGlobe /> },
  { id: 2, label: "Security Experts", value: "150+", icon: <FaUsers /> },
  { id: 3, label: "Awards Won", value: "12", icon: <FaAward /> },
  { id: 4, label: "AI Innovations", value: "45+", icon: <FaLightbulb /> },
];

const AboutPage = () => {
  return (
    <main className="about-page">
      {/* Hero Section */}
      <section className="about-hero">
        <div className="container">
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            className="subtitle"
          >
            OUR MISSION
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }}
          >
            Securing the <span>Future of SaaS</span> <br /> One Byte at a Time.
          </motion.h1>
          <p>
            NexaAI started with a simple idea: security shouldn't be a bottleneck for innovation. 
            Today, we power thousands of startups with neural-protected infrastructure.
          </p>
        </div>
      </section>

      {/* Story & Stats Section */}
      <section className="about-content">
        <div className="container">
          <div className="content-grid">
            <motion.div 
              className="story-box"
              whileInView={{ opacity: 1, x: 0 }}
              initial={{ opacity: 0, x: -30 }}
            >
              <h2>The Story Behind <span>NexaAI</span></h2>
              <p>
                Founded in 2024, our team realized that traditional firewalls were failing against 
                next-gen AI threats. We built NexaAI to be the world's first proactive neural security layer.
              </p>
              <p>
                We believe in a world where developers can ship code without fear, and companies 
                can scale without worrying about their digital assets.
              </p>
              <button className="read-more">Learn Our Tech →</button>
            </motion.div>

            <div className="stats-grid">
              {stats.map((stat) => (
                <motion.div 
                  key={stat.id} 
                  className="stat-card"
                  whileHover={{ y: -5 }}
                >
                  <div className="icon">{stat.icon}</div>
                  <h3>{stat.value}</h3>
                  <p>{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team/Vision CTA */}
      <section className="vision-cta">
        <div className="container">
          <div className="glass-banner">
            <h3>Join us on our journey to secure the internet.</h3>
            <button className="btn-primary">View Careers</button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default AboutPage;