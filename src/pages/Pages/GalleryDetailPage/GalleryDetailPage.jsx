import React, { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Image as ImageIcon, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import "./GalleryDetailPage.scss";
import EmptyState from "components/EmptyState/EmptyState.jsx";

const GalleryDetailPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const gallery = location.state?.gallery;

  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleKeyDown = useCallback((e) => {
    if (selectedIndex === null) return;
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "Escape") setSelectedIndex(null);
  }, [selectedIndex]);

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!gallery) {
    return (
        <EmptyState 
        title="No Galleries Found" 
        message="We haven't added any photos yet. Please check back later for our latest updates."
        buttonText="Back to Home"
      />
    );
  }

  const handleNext = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev + 1) % gallery.images.length);
  };

  const handlePrev = (e) => {
    e?.stopPropagation();
    setSelectedIndex((prev) => (prev - 1 + gallery.images.length) % gallery.images.length);
  };

  return (
    <div className="gallerydetail-page-wrapper">
      <div className="gallerydetail-container">
        {/* Header Section */}
        <header className="gallerydetail-header">
          <button className="gallerydetail-back-btn" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} /> Back
          </button>
          <div className="gallerydetail-title-info">
            <span className="gallerydetail-tag">
              <ImageIcon size={14} /> Official Gallery
            </span>
            <h1>{gallery.title}</h1>
            <div className="gallerydetail-divider"></div>
          </div>
        </header>

        {/* Images Grid */}
        <div className="gallerydetail-grid">
          {gallery.images?.map((img, index) => (
            <motion.div 
              key={img.id || index}
              className="gallerydetail-item"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ 
                opacity: 1, 
                scale: 1,
                // Subtle pulse animation to grab attention on scroll
                transition: { delay: index * 0.05, duration: 0.5 } 
              }}
              whileHover={{ scale: 1.02 }}
              viewport={{ once: true, margin: "-50px" }}
              onClick={() => setSelectedIndex(index)}
            >
              <div className="gallerydetail-img-box">
                <img src={img.url} alt={img.imagetitle || gallery.title} />
                
                {/* 🔹 New: Dynamic Hint Overlay that pulses slightly */}
                <div className="gallerydetail-interaction-hint">
                   <div className="hint-circle">
                      <Maximize2 size={18} />
                   </div>
                   <span>Expand the Moment</span>
                </div>
              </div>
              {img.imagetitle && (
                <div className="gallerydetail-img-footer">
                  <p>{img.imagetitle}</p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      {/* FULL SCREEN LIGHTBOX */}
      <AnimatePresence>
        {selectedIndex !== null && (
          <motion.div 
            className="gallerydetail-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedIndex(null)}
          >
            <button className="lightbox-close" onClick={() => setSelectedIndex(null)}>
              <X size={35} />
            </button>

            <button className="lightbox-nav prev" onClick={handlePrev}>
              <ChevronLeft size={45} />
            </button>

            <motion.div 
              className="lightbox-content"
              key={selectedIndex}
              initial={{ scale: 0.7, opacity: 0, rotate: -2 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              onClick={(e) => e.stopPropagation()}
            >
              <img src={gallery.images[selectedIndex].url} alt="fullscreen" />
              {gallery.images[selectedIndex].imagetitle && (
                <div className="lightbox-caption">
                  {gallery.images[selectedIndex].imagetitle}
                </div>
              )}
            </motion.div>

            <button className="lightbox-nav next" onClick={handleNext}>
              <ChevronRight size={45} />
            </button>

            {/* <div className="lightbox-counter">
              {selectedIndex + 1} / {gallery.images.length}
            </div> */}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GalleryDetailPage;