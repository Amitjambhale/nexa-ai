import React from 'react';
import { motion } from 'framer-motion';
import { Award, RefreshCw, Clock, CheckCircle } from 'lucide-react';
import './OurStrengthSection.scss';

const OurStrengthSection = () => {
  const strengths = [
    {
      id: 1,
      icon: <Award />,
      title: "Sound Industry Knowledge",
      desc: "Varied range of financial products with expert insights.",
      color: "#1a2b4c"
    },
    {
      id: 2,
      icon: <RefreshCw />,
      title: "Regular Review",
      desc: "Continuous monitoring of your financial products & needs.",
      color: "#c5a059"
    },
    {
      id: 3,
      icon: <Clock />,
      title: "Timely Services",
      desc: "Fast, reliable and dedicated support at every step.",
      color: "#e63946"
    }
  ];

  return (
    <section className="strength-orbital-section">
      <div className="container">
        <div className="orbital-wrapper">
          
          {/* Left Side: The Main Focus Hub */}
          <div className="hub-area">
            <motion.div 
              className="hub-circle"
              initial={{ scale: 0.8, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
            >
              <div className="inner-content">
                <h2>Our <br/><span>Strength</span></h2>
                <p>The pillars of our commitment to your financial growth.</p>
              </div>
              {/* Spinning Decorative Rings */}
              <div className="ring ring-1"></div>
              <div className="ring ring-2"></div>
            </motion.div>
          </div>

          {/* Right Side: The Connected Points (Not Cards) */}
          <div className="points-area">
            {strengths.map((item, index) => (
              <motion.div 
                key={item.id}
                className="strength-point"
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.3, duration: 0.6 }}
              >
                <div className="point-connector">
                  <div className="dot"></div>
                  <div className="line"></div>
                </div>
                
                <div className="point-content">
                  <div className="icon-sphere" style={{ background: item.color }}>
                    {item.icon}
                  </div>
                  <div className="text-box">
                    <h3>{item.title}</h3>
                    <p>{item.desc}</p>
                    {/* <div className="check-tag">
                      <CheckCircle size={14} /> Guaranteed Excellence
                    </div> */}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default OurStrengthSection;