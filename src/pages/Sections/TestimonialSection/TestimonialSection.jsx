import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import "./TestimonialSection.scss";
import { useNavigate } from "react-router-dom";

const testimonials = [
  {
    id: 1,
    name: "Mr. Sanjeev Garse",
    text: "I really appreciate your time to time detailed guidance for me. LIC policy is going to be useful for me and is going to support me financial...",
    image: "https://assurreplus.com/assets/testimonials/940/940.jpeg",
  },
  {
    id: 2,
    name: "Dr. Sachin Dusane",
    text: "As I am a doctor so many insurance advisors came across my journey, but Dilip Paatil only can explain about the importance of assets.",
    image: "https://assurreplus.com/assets/testimonials/941/941.jpeg",
  },
  {
    id: 3,
    name: "Mr. Harshil Shavdia",
    text: "Assurre Plus is one stop destination for meeting all insurance needs. Dilipji ensures hassle free process to meet individual's goals.",
    image: "https://assurreplus.com/assets/testimonials/942/942.jpeg",
  },
];

const TestimonialSection = () => {
  const navigate = useNavigate();
  return (
    <section className="v2-testimonial-section">
      <div className="container">
        <header className="v2-header">
         
          <motion.h2 
            className="v2-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
           Trust <span>Voices</span>
          </motion.h2>
           <motion.span 
            className="v2-tag"
            initial={{ opacity: 0, }}
            whileInView={{ opacity: 1, }}
            transition={{ duration: 0.8 }}
          >
            Hear the voices of trust and security from those who have walked this journey with us.
          </motion.span>
        </header>

        <div className="v2-grid">
          {testimonials.map((item, idx) => (
            <motion.div
              className="v2-card"
              key={item.id}
              layout // Smooth layout changes ke liye
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }} // Hover animation directly here
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                type: "spring",
                stiffness: 100 
              }}
            >
              <div className="v2-card-content">
                <div className="v2-img-container">
                  <img src={item.image} alt={item.name} />
                </div>

                <p className="v2-text">"{item.text}"</p>

                <div className="v2-footer">
                  <div className="v2-line"></div>
                  <h4 className="v2-name">{item.name}</h4>
                </div>
              </div>

              <div className="v2-card-glow"></div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="testimonial-footer"
        >
          <button className="view-all-btn" onClick={ () => navigate("/testimonials")}>
            <LayoutGrid size={20} /> View All Testimonials
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;