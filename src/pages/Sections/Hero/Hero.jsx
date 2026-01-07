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

const Hero = ({ onExploreClick }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const res = await getBanners();
        if (res?.code === 200 && res?.data?.banners?.length > 0) {
          const sorted = res.data.banners.sort(
            (a, b) => a.DisplayOrder - b.DisplayOrder
          );
          setBanners(sorted);
        } else {
          setBanners([]);
        }
      } catch (err) {
        console.error(err);
        setBanners([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  if (!loading && banners.length === 0) return null;
  if (loading) return null;

  return (
    <section className="hero-main">
      <Swiper
        modules={[Pagination, Autoplay, EffectFade]}
        effect="fade"
        speed={1000}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        onSlideChange={(s) => setActiveIndex(s.realIndex)}
        loop={banners.length > 1}
        className="hero-swiper"
      >
        {banners.map((slide, index) => (
          <SwiperSlide key={slide.BannerID}>
            <div className="hero-slide-item">
              <div className="hero-container">
                <div className="hero-split-wrapper">

                  {/* IMAGE */}
                  <div className="hero-image-side">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div
                          key={slide.BannerID}
                          initial={{ opacity: 0, scale: 0.9, x: -40 }}
                          animate={{ opacity: 1, scale: 1, x: 0 }}
                          exit={{ opacity: 0, scale: 0.9 }}
                          transition={{ duration: 0.7 }}
                          className="image-holder"
                          onClick={() =>
                            slide.BannerUrl &&
                            window.open(slide.BannerUrl, "_blank")
                          }
                          style={{
                            cursor: slide.BannerUrl ? "pointer" : "default",
                          }}
                        >
                          <img
                            src={slide.attachmentUrl}
                            alt={slide.BannerTitle}
                          />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* TEXT */}
                  <div className="hero-text-side">
                    <AnimatePresence mode="wait">
                      {activeIndex === index && (
                        <motion.div
                          key={`text-${slide.BannerID}`}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.6, delay: 0.15 }}
                        >
                          <span className="hero-badge">
                            Assurre Plus Financial Services
                          </span>

                          <h1>{slide.BannerTitle}</h1>

                          <p className="banner-desc">
                            {slide.Description ||
                              "Secure your family's future today with our comprehensive and flexible insurance plans tailored for you."}
                          </p>

                          <div className="hero-actions">
                            <button className="hero-btn-primary" onClick={onExploreClick}>
                              <span>Explore Plans</span>
                              <div className="icon-circle">
                                <FaChevronRight />
                              </div>
                            </button>

                            <button
                              className="hero-btn-outline"
                              onClick={() => navigate("/faq")}
                            >
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
