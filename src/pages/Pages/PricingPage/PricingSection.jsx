import React from "react";
import { FaCheck } from "react-icons/fa";
import { motion } from "framer-motion"; // 🔥 Animation library
import "./PricingSection.scss";

const pricingPlans = [
  {
    id: 1,
    name: "Basic",
    price: "₹999",
    desc: "Perfect for small startups & personal projects",
    features: [
      "Responsive Landing Page",
      "Modern UI Design",
      "Basic Components",
      "Email Support",
    ],
  },
  {
    id: 2,
    name: "Pro",
    price: "₹2499",
    desc: "Best for SaaS & business websites",
    popular: true,
    features: [
      "Premium UI/UX",
      "All Landing Sections",
      "Dark SaaS Theme",
      "Fast Performance",
      "Priority Support",
    ],
  },
  {
    id: 3,
    name: "Enterprise",
    price: "₹4999",
    desc: "For agencies & large scale projects",
    features: [
      "Full Template Package",
      "Reusable Components",
      "Advanced Animations",
      "Commercial License",
      "Lifetime Updates",
    ],
  },
];

const PricingSection = () => {
  return (
    <section className="premium-pricing">
      <div className="container">
        {/* 🔥 Header Animation */}
        <motion.div 
          className="pricing-header"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2>
            Simple & Transparent <span>Pricing</span>
          </h2>
          <p>
            Choose the perfect plan for your project. No hidden fees, no extra
            charges.
          </p>
        </motion.div>

        <div className="pricing-grid">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className={`pricing-card ${plan.popular ? "popular" : ""}`}
              // 🔥 Card Entrance Animation
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }} // Ek-ek karke aayenge
              viewport={{ once: true }}
            >
              {plan.popular && <div className="badge">Most Popular</div>}

              <h3>{plan.name}</h3>
              <h4>{plan.price}</h4>
              <p className="desc">{plan.desc}</p>

              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>
                    <FaCheck /> {feature}
                  </li>
                ))}
              </ul>

              <button className="pricing-btn">Get Started</button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PricingSection;