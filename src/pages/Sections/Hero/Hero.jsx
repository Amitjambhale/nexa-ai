import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import banner1 from "../../../assets/icons/banner1.png";
import banner2 from "../../../assets/icons/banner2.png";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Hero.scss";


const heroSlides = [
  {
    id: 1,
    title: "Protect Your Loved Ones Life With Insurance",
    subtitle:
      "Secure their family's future today with our comprehensive and flexible life insurance plans.",
    image: banner1,
  },
  {
    id: 2,
    title: "Your Trusted Partner In Financial Security",
    subtitle:
      "We ensure your wealth is protected with sincere trust and the best investment strategies.",
    image: banner2,
  },
];

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <section className="hero-main">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={true}
        className="hero-swiper"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide key={slide.id}>
            <div className="hero-slide-item">
              <div className="hero-container">
                <div className="hero-split-wrapper">

                  {/* LEFT IMAGE */}
                  <div className="hero-image-side">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div
                          key={`img-${slide.id}`}
                          initial={{ opacity: 0, scale: 0.9, x: -50 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9, x: -20 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="image-holder"
                        >
                          <img src={slide.image} alt="Insurance" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="hero-text-side">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div>
                          <span className="hero-badge">
                            Assurre Plus Financial Services
                          </span>

                          <h1>{slide.title}</h1>

                          <p>{slide.subtitle}</p>

                          <div className="hero-actions">
                            <button className="hero-btn-primary">
                              <span>Explore Plans</span>
                              <div className="icon-circle">
                                <FaChevronRight />
                              </div>
                            </button>

                            <button className="hero-btn-outline" onClick={()=> navigate("/faq")}>
                              View FAQ
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;
