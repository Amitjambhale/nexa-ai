import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay, EffectFade } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getBanners } from "services/home/SectionsApis/sectionsapi";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "./Hero.scss";

const Hero = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBanners();
        if (res && res.code === 200 && res.data && res.data.banners && res.data.banners.length > 0) {
          // DisplayOrder ke hisab se ascending order mein sort karna
          const sortedBanners = res.data.banners.sort((a, b) => a.DisplayOrder - b.DisplayOrder);
          setBanners(sortedBanners);
        } else {
          setBanners([]);
        }
      } catch (err) {
        console.error("Error fetching banners:", err);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  // Agar loading khatam ho jaye aur banners empty hon, toh poora section hide kar dein
  if (!loading && banners.length === 0) {
    return null;
  }

  if (loading) return null;

  return (
    <section className="hero-main">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        loop={banners.length > 1}
        className="hero-swiper"
      >
        {banners.map((slide, index) => (
          <SwiperSlide key={slide.BannerID}>
            <div className="hero-slide-item">
              <div className="hero-container">
                <div className="hero-split-wrapper">
                  
                  {/* LEFT IMAGE - Image click par BannerUrl open hoga */}
                  <div className="hero-image-side">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div
                          key={`img-${slide.BannerID}`}
                          initial={{ opacity: 0, scale: 0.9, x: -50 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9, x: -20 }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                          className="image-holder"
                          style={{ cursor: slide.BannerUrl ? "pointer" : "default" }}
                          onClick={() => slide.BannerUrl && window.open(slide.BannerUrl, "_blank")}
                        >
                          <img src={slide.attachmentUrl} alt={slide.BannerTitle} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="hero-text-side">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div
                          key={`text-${slide.BannerID}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, delay: 0.2 }}
                        >
                          <span className="hero-badge">
                            Assurre Plus Financial Services
                          </span>

                          <h1>{slide.BannerTitle}</h1>

                          {/* 3 Line limit description */}
                          <p className="banner-desc">
                            {slide.Description || "Secure your family's future today with our comprehensive and flexible insurance plans tailored for you."}
                          </p>

                          <div className="hero-actions">
                            <button className="hero-btn-primary">
                              <span>Explore Plans</span>
                              <div className="icon-circle">
                                <FaChevronRight />
                              </div>
                            </button>

                            <button className="hero-btn-outline" onClick={() => navigate("/faq")}>
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