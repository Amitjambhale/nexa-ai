import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image as ImageIcon, LayoutGrid } from "lucide-react";
import "./GallerySection.scss";
import { useNavigate } from "react-router-dom";

const galleryData = [
  { id: 1, title: "GLOBAL TROPHIES", images: ["https://webxpress.instrasoftsolutions.in/assets/gallery/9089/9089.jpeg", "https://assurreplus.com/assets/gallery/9071/9071.jpeg", "https://webxpress.instrasoftsolutions.in/assets/gallery/9075/9075.jpeg"] },
  { id: 2, title: "MOMENTS OF HONOR", images: ["https://webxpress.instrasoftsolutions.in/assets/gallery/9108/9108.jpeg", "https://assurreplus.com/assets/gallery/9109/9109.jpeg", "https://assurreplus.com/assets/gallery/9123/9123.jpeg"] },
  { id: 3, title: "OUR CERTIFICATES", images: ["https://webxpress.instrasoftsolutions.in/assets/gallery/9829/9829.jpeg", "https://assurreplus.com/assets/gallery/10018/10018.jpeg", "https://assurreplus.com/assets/gallery/10663/10663.jpeg"] },
  { id: 4, title: "MOMENT WITH SPECIAL PERSON", images: ["https://assurreplus.com/assets/gallery/18924/18924.jpeg", "https://assurreplus.com/assets/gallery/18929/18929.jpeg", "https://assurreplus.com/assets/gallery/18925/18925.jpeg"] },
];

const TileCard = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);


  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImg((prev) => (prev + 1) % item.images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [item.images.length]);

  return (
    <motion.div 
      className="tile-card"
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <div className="tile-media">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentImg}
            src={item.images[currentImg]}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            alt={item.title}
          />
        </AnimatePresence>
        <div className="hover-indicator">
          <Plus size={20} color="#fff" />
        </div>
      </div>
      <div className="tile-content">
        <div className="category-label">
          <ImageIcon size={12} /> <span>Gallery</span>
        </div>
        <h4>{item.title}</h4>
      </div>
    </motion.div>
  );
};

const GallerySection = () => {
    const navigate = useNavigate();
  return (
    <section className="clean-gallery-v3">
      <div className="container">
        <header className="minimal-head">
          <div className="title-area">
            <span className="sub">Excellence in Frames</span>
            <h2>Golden <span>Moments</span></h2>
          </div>
          <p className="side-text">
            Capturing the essence of trust and milestones at Assurre Plus.
          </p>
        </header>

        <div className="tiles-grid">
          {galleryData.map((item) => (
            <TileCard key={item.id} item={item} />
          ))}
        </div>
            <motion.div
          className="gallery-footer"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <button className="view-all-btn" onClick={() => navigate("/gallery")}>
            <LayoutGrid size={20} /> View All Galleries
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default GallerySection;