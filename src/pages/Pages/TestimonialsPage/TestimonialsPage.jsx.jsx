import React from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaQuoteLeft } from "react-icons/fa";
import "./TestimonialsPage.scss";

const TestimonialsPage = () => {
  const testimonials = [
    {
      id: 1,
      name: "Mr. Sanjeev Garse, GM (Operation) Push Engg. Pvt.Ltd. Pune.",
      desc: "I really appreciate your time to time detailed guidance for me. LIC policy is going to be useful for me and is going to support me financially in the future. I also appreciate your dedicated efforts towards providing me the LIC updates. Thank you for your guidance, which we really needed.",
      img: "https://assurreplus.com/assets/testimonials/940/940.jpeg",
    },
    {
      id: 2,
      name: "Dr. Sachin Dusane",
      desc: "As I am a doctor so many insurance advisors came across my journey, but Mr Dillep Paatil and Mrs Purnima Patil only can explain about the importance and different plans of policies . I like your bucket concept. How to fill different buckets of saving and insurance . You are a fusion of friendly person and professional advisor. What a meaningful full name, \"ASSURRE PLUS\" is...! You proved it with your work. Thanks to be a guide for us in insurance and investments !",
      img: "https://assurreplus.com/assets/testimonials/941/941.jpeg",
    },
    {
      id: 3,
      name: "Mr. Harshil Shavdia, CA",
      desc: "Assurre Plus is one stop destination for meeting all  insurance needs. Dilipji ensures hassle free process to meet individual's insurance requirements. Seeing services, have referred my friends to consult Dilipji for all their insurance planning ",
      img: "https://assurreplus.com/assets/testimonials/942/942.jpeg",
    },
  ];

  return (
    <div className="premium-testimonial-flow">
      <div className="container">
        <header className="testimonial-header-v2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="premium-label">Voices of Assurre Plus</span>
            <h2>
              Real Stories <span>Real Trust.</span>
            </h2>
          </motion.div>
        </header>

        <div className="journey-wrapper">
          <div className="dynamic-line"></div>

          {testimonials.map((item, index) => (
            <div
              key={item.id}
              className={`journey-step ${
                index % 2 === 0 ? "left-aligned" : "right-aligned"
              }`}
            >
              {/* CONTENT AREA */}
              <motion.div
                className="content-side"
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="testimonial-box">
                  <FaQuoteLeft className="mobile-quote-icon" />
                  <p className="quote-text">{item.desc}</p>
                  <div className="client-footer">
                    <span className="name">{item.name}</span>
                    <span className="rank">{item.rank}</span>
                  </div>
                </div>
              </motion.div>

              {/* CENTER ICON */}
              <div className="center-anchor">
                <div className="shield-hex">
                  <FaShieldAlt className="s-icon" />
                  <div className="step-count">{index + 1}</div>
                </div>
              </div>

              {/* IMAGE AREA */}
              <motion.div
                className="image-side"
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
              >
                <div className="portrait-frame">
                  <img src={item.img} alt={item.name} />
                  <div className="floating-ornament"></div>
                </div>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TestimonialsPage;