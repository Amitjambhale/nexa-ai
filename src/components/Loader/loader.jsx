import React from "react";
import { motion } from "framer-motion";
import "./loader.scss";

const PremiumLoader = () => {
  return (
    <div className="premium-loader-container">
      <div className="loader-content">
        <div className="liquid-wrapper">
          {/* Main circles for liquid effect */}
          {[1, 2, 3].map((item) => (
            <motion.div
              key={item}
              className={`liquid-bubble bubble-${item}`}
              animate={{
                scale: [1, 1.2, 1],
                rotate: [0, 180, 360],
                borderRadius: ["40% 60% 70% 30% / 40% 50% 60% 50%", "60% 40% 30% 70% / 50% 30% 70% 50%", "40% 60% 70% 30% / 40% 50% 60% 50%"]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: item * 0.4
              }}
            />
          ))}
          <div className="loader-icon">
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {/* Aapka Logo ya Icon yahan aa sakta hai */}
              <span className="loader-text">AP</span>
            </motion.div>
          </div>
        </div>
        <motion.p 
          className="loading-label"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Securing your trust...
        </motion.p>
      </div>
    </div>
  );
};

export default PremiumLoader;