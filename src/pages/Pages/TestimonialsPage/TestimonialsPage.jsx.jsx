import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaQuoteLeft } from "react-icons/fa";
import { getTestimonials } from "services/home/SectionsApis/sectionsapi";
import PremiumLoader from "components/Loader/Loader";
import LoadMoreButton from "components/LoadMoreButton/LoadMoreButton";
import EmptyState from "components/EmptyState/EmptyState.jsx";
import "./TestimonialsPage.scss";

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    fetchData(1, false);
  }, []);

  const fetchData = async (pageNum, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadMoreLoading(true);
      else setLoading(true);

      const res = await getTestimonials({ page: pageNum, limit: 10 });
      
      if (res && res.code === 200 && res.data) {
        const newItems = res.data.testimonials || [];
        
        if (isLoadMore) {
          setTestimonials((prev) => [...prev, ...newItems]);
        } else {
          setTestimonials(newItems);
        }
        
        setTotalCount(Number(res.data.total) || 0);
      }
    } catch (err) {
      console.error("Testimonials API Error:", err);
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage); 
    fetchData(nextPage, true);
  };

  // 1. INITIAL FULL PAGE LOADER
  if (loading && page === 1) {
    return (
      <div className="full-page-loader">
        <PremiumLoader />
      </div>
    );
  }

  // 2. MINIMAL EMPTY STATE (Replaced Card Style)
  if (testimonials.length === 0) {
    return (
      <EmptyState 
        title="No Testimonials Found" 
        message="We are currently gathering feedback from our clients. Please check back soon to see their stories."
        buttonText="Return to Home"
      />
    );
  }

  return (
    <div className="premium-testimonial-flow">
      <div className="container">
        <header className="testimonial-header-v2">
          <h2>Real Stories <span>Real Trust.</span></h2>
        </header>

        <div className="journey-wrapper">
          <div className="dynamic-line"></div>
          {testimonials.map((item, index) => (
            <motion.div 
              key={item.ID || index} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className={`journey-step ${index % 2 === 0 ? "left-aligned" : "right-aligned"}`}
            >
              <div className="content-side">
                <div className="testimonial-box">
                  <FaQuoteLeft className="mobile-quote-icon" />
                  <p className="quote-text">{item.Description}</p>
                  <div className="client-footer">
                    <span className="name">{item.Name}</span>
                  </div>
                </div>
              </div>
              <div className="center-anchor">
                <div className="shield-hex">
                  <FaShieldAlt className="s-icon" />
                  <div className="step-count">{index + 1}</div>
                </div>
              </div>
              <div className="image-side">
                <div className="portrait-frame">
                  <img src={item.imageUrl} alt={item.Name} />
                  <div className="floating-ornament"></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* REUSABLE LOAD MORE BUTTON */}
        <LoadMoreButton 
          onLoadMore={handleLoadMore}
          loading={loadMoreLoading}
          hasNextPage={testimonials.length < totalCount}
          label="Load More"
        />
      </div>
    </div>
  );
};

export default TestimonialsPage;