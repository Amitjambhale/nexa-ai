import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Image as ImageIcon, LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getGallary } from "services/home/SectionsApis/sectionsapi";
import "./GallerySection.scss";

const TileCard = ({ item }) => {
  const [currentImg, setCurrentImg] = useState(0);

  useEffect(() => {
    if (item.images && item.images.length > 1) {
      const interval = setInterval(() => {
        setCurrentImg((prev) => (prev + 1) % item.images.length);
      }, 3000);
      return () => clearInterval(interval);
    }
  }, [item.images]);

  // API response mein image URL 'url' field mein hai
  const displayImage = item.images && item.images.length > 0 
    ? item.images[currentImg]?.url 
    : "";

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
            src={displayImage}
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
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGallery = async () => {
      try {
        const res = await getGallary({ limit: 4, page: 1 });
        if (res.code === 200 && res.data && res.data.galleries) {
          setGalleries(res.data.galleries);
        }
      } catch (err) {
        console.error("Gallery Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchGallery();
  }, []);

  // Agar data nahi hai toh section hide kar do
  if (!loading && galleries.length === 0) {
    return null;
  }

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
          {galleries.map((item) => (
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