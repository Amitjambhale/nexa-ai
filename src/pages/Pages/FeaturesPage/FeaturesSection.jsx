import React from "react";
import { motion } from "framer-motion";
import {
  FaBolt,
  FaShieldAlt,
  FaMobileAlt,
  FaRocket,
  FaLayerGroup,
  FaHeadset,
} from "react-icons/fa";
import "./FeaturesSection.scss";

const features = [
  {
    id: 1,
    icon: <FaBolt />,
    title: "Lightning Fast Performance",
    desc: "Optimized code structure ensures ultra-fast loading and smooth user experience.",
  },
  {
    id: 2,
    icon: <FaShieldAlt />,
    title: "Secure & Reliable",
    desc: "Built with best practices to ensure security, stability, and scalability.",
  },
  {
    id: 3,
    icon: <FaMobileAlt />,
    title: "Fully Responsive",
    desc: "Perfectly optimized for mobile, tablet, and desktop devices.",
  },
  {
    id: 4,
    icon: <FaRocket />,
    title: "Modern SaaS Design",
    desc: "Premium UI design crafted for startups, agencies, and SaaS products.",
  },
  {
    id: 5,
    icon: <FaLayerGroup />,
    title: "Reusable Components",
    desc: "Clean and scalable component structure for easy customization.",
  },
  {
    id: 6,
    icon: <FaHeadset />,
    title: "Easy Customization",
    desc: "Well-organized code so developers can edit and scale quickly.",
  },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 },
};

const FeaturesSection = () => {
  return (
    <section className="premium-features">
      <div className="container">
        {/* Header */}
        <div className="features-header">
          <h2>
            Powerful Features That Make Us <span>Stand Out</span>
          </h2>
          <p>
            Designed with modern UI, performance, and scalability in mind for
            startups and premium SaaS products.
          </p>
        </div>

        {/* Features Grid */}
        <motion.div
          className="features-grid"
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.id}
              variants={cardVariants}
              className="feature-card"
            >
              <div className="icon-box">{feature.icon}</div>
              <h3>{feature.title}</h3>
              <p>{feature.desc}</p>
              <div className="card-glow"></div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturesSection;