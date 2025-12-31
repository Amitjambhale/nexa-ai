import React from "react";
import { motion } from "framer-motion";
import { FaImages, FaArrowRight, FaAward } from "react-icons/fa";
import "./GallaryPage.scss";

const galleryData = [
  { id: 1, title: "GLOBAL TROPHIES",  images: ["https://webxpress.instrasoftsolutions.in/assets/gallery/9089/9089.jpeg", "https://assurreplus.com/assets/gallery/9071/9071.jpeg", "https://webxpress.instrasoftsolutions.in/assets/gallery/9075/9075.jpeg"] },
  { id: 2, title: "MOMENTS OF HONOR", images: ["https://webxpress.instrasoftsolutions.in/assets/gallery/9108/9108.jpeg", "https://assurreplus.com/assets/gallery/9109/9109.jpeg", "https://assurreplus.com/assets/gallery/9123/9123.jpeg"] },
  { id: 3, title: "OUR CERTIFICATES",images: ["https://webxpress.instrasoftsolutions.in/assets/gallery/9829/9829.jpeg", "https://assurreplus.com/assets/gallery/10018/10018.jpeg", "https://assurreplus.com/assets/gallery/10663/10663.jpeg"] },
  { id: 4, title: "MOMENT WITH SPECIAL PERSON", images: ["https://assurreplus.com/assets/gallery/18924/18924.jpeg", "https://assurreplus.com/assets/gallery/18929/18929.jpeg", "https://assurreplus.com/assets/gallery/18925/18925.jpeg"] },
];

const GallaryPage = () => {
  return (
    <div className="gallarypage-wrapper">
      {/* 🔹 Wahi Pehle Wala Header & Title */}
      <section className="gallarypage-hero">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="gallarypage-header-content"
        >
          <span className="gallarypage-badge">OUR JOURNEY</span>
          <h1>Memories In <span>Frames</span></h1>
          <p>A collection of our achievements, honors, and special moments that define our excellence.</p>
        </motion.div>
      </section>

      {/* 🔹 Naya "Expanding Reveal" Gallery Design */}
      <div className="gallarypage-grid-container">
        {galleryData.map((album, index) => (
          <motion.div 
            key={album.id}
            className="gallarypage-reveal-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="gallarypage-main-frame">
              {/* Main Background Image */}
              <img src={album.images[0]} alt={album.title} className="gallarypage-bg-img" />
              
              <div className="gallarypage-content-overlay">
                <div className="gallarypage-top-info">
                  <div className="gallarypage-photo-count"><FaImages /> {album.images.length}</div>
                </div>

                <div className="gallarypage-bottom-info">
                  <h3>{album.title}</h3>
                </div>

                {/* Hover Par Reveal Hone Wali Images */}
                <div className="gallarypage-hidden-reveal">
                   <div className="gallarypage-reveal-grid">
                      {album.images.slice(1).map((subImg, i) => (
                        <div key={i} className="gallarypage-reveal-item">
                           <img src={subImg} alt="sub" />
                        </div>
                      ))}
                      <div className="gallarypage-reveal-more">
                        <span>+ More</span>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default GallaryPage;