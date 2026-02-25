import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronDown, FaQuestionCircle } from "react-icons/fa";
import "./FAQPage.scss";

const faqData = [
  {
    id: 1,
    question: "What is NexaAI?",
    answer: "NexaAI is a high-performance React template built for the next generation of AI startups. It features a modular architecture, SCSS styling, and framer-motion animations out of the box."
  },
  {
    id: 2,
    question: "How do I customize the brand colors?",
    answer: "Customization is seamless. All colors are managed via SCSS variables. Simply update the $primary and $accent variables in your theme file to instantly reflect your brand identity."
  },
  {
    id: 3,
    question: "Is the waitlist system functional?",
    answer: "The UI for the waitlist modal is fully integrated. You can easily connect it to services like Mailchimp, Firebase, or your custom API with just a few lines of code."
  },
  {
    id: 4,
    question: "Are the assets included in the license?",
    answer: "Yes, all premium icons, glowing effects, and illustrations used in this template are royalty-free and included in your one-time purchase."
  }
];

const FAQPage = () => {
  const [activeId, setActiveId] = useState(null);

  return (
    <section className="premium-faq" id="faq">
      <div className="faq-glow-top"></div>
      <div className="faq-glow-bottom"></div>
      
      <div className="container">
        <motion.div 
          className="faq-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="faq-badge">
            <FaQuestionCircle /> Help Center
          </span>
          <h2>Got <span>Questions?</span> We’ve Got Answers.</h2>
          <p>Everything you need to know about the NexaAI template and its capabilities.</p>
        </motion.div>

        <div className="faq-wrapper">
          {faqData.map((faq, index) => (
            <motion.div 
              key={faq.id} 
              className={`faq-card ${activeId === faq.id ? "active" : ""}`}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <button 
                className="faq-trigger" 
                onClick={() => setActiveId(activeId === faq.id ? null : faq.id)}
                aria-expanded={activeId === faq.id}
              >
                <div className="q-info">
                  <span className="q-number">0{index + 1}</span>
                  <span className="q-text">{faq.question}</span>
                </div>
                <motion.span 
                  className="q-icon"
                  animate={{ 
                    rotate: activeId === faq.id ? 180 : 0,
                    color: activeId === faq.id ? "#a855f7" : "#4f8cff" 
                  }}
                >
                  <FaChevronDown />
                </motion.span>
              </button>

              <AnimatePresence>
                {activeId === faq.id && (
                  <motion.div
                    className="faq-content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.04, 0.62, 0.23, 0.98] }}
                  >
                    <div className="inner-content">
                      <p>{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQPage;