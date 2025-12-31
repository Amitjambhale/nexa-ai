import React from "react";
import { motion } from "framer-motion";
import { FaAward, FaUsers, FaChartLine, FaCheckCircle } from "react-icons/fa";
import "./AchievementSection.scss";

const achievements = [
  {
    id: 1,
    icon: <FaChartLine />,
    value: "13",
    suffix: "Yr",
    label: "Professional Experience",
    desc: "As Financial Advisor",
    color: "#1a2b4c" // Navy
  },
  {
    id: 2,
    icon: <FaAward />,
    value: "8",
    suffix: "+",
    label: "Global Recognition",
    desc: "Million Dollar Round Table",
    color: "#c5a059" // Gold
  },
  {
    id: 3,
    icon: <FaUsers />,
    value: "2000",
    suffix: "+",
    label: "Trusted Families",
    desc: "Managing Portfolios",
    color: "#e63946" // Subtle Red Accent
  }
];

const AchievementSection = () => {
  return (
    <section className="achieve-section-new">
      <div className="decor-circle circle-1"></div>
      <div className="decor-circle circle-2"></div>

      <div className="achieve-container-new">
        <div className="achieve-row">
          
          {/* Left Content Side */}
          <div className="achieve-info-col">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="info-content"
            >
              <span className="top-title">OUR PERFORMANCE</span>
              <h2>Milestones of <span>Excellence</span></h2>
              <p>
                We take pride in our journey of securing futures. Our achievements are a 
                reflection of the trust our clients place in us every single day.
              </p>
              
              <ul className="achieve-features">
                <li><FaCheckCircle /> 100% Client Satisfaction</li>
                <li><FaCheckCircle /> Certified Financial Expertise</li>
                <li><FaCheckCircle /> Personalized Wealth Strategies</li>
              </ul>
            </motion.div>
          </div>

          {/* Right Cards Side */}
          <div className="achieve-cards-col">
            <div className="cards-staggered">
              {achievements.map((item, index) => (
                <motion.div 
                  className={`achievement-card-box card-${index}`}
                  key={item.id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.2 }}
                  whileHover={{ y: -10, scale: 1.02 }}
                >
                  <div className="card-inner">
                    <div className="icon-main" style={{ backgroundColor: item.color }}>
                      {item.icon}
                    </div>
                    <div className="number-area">
                      <h3>{item.value}<span>{item.suffix}</span></h3>
                    </div>
                    <div className="text-area">
                      <h4>{item.label}</h4>
                      <p>{item.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AchievementSection;