import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaImages } from "react-icons/fa";
import { getGallary } from "services/home/SectionsApis/sectionsapi";
import PremiumLoader from "components/Loader/Loader";
import LoadMoreButton from "components/LoadMoreButton/LoadMoreButton";
import EmptyState from "components/EmptyState/EmptyState.jsx";
import "./GallaryPage.scss";

const GallaryPage = () => {
  const [galleries, setGalleries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadMoreLoading, setLoadMoreLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const limit = 10;

  const fetchGalleries = async (currentPage, isLoadMore = false) => {
    try {
      if (isLoadMore) setLoadMoreLoading(true);
      else setLoading(true);

      const res = await getGallary({ page: currentPage, limit });

      if (res && res.code === 200 && res.data) {
        const newGalleries = res.data.galleries || [];

        setGalleries((prev) =>
          isLoadMore ? [...prev, ...newGalleries] : newGalleries
        );

        setTotalPage(Number(res.data.totalPages) || 1);
        setPage(currentPage);
      }
    } catch (err) {
      console.error("Gallery API Error:", err);
    } finally {
      setLoading(false);
      setLoadMoreLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleries(1, false);
  }, []);

  const handleLoadMore = () => {
    if (page >= totalPage || loadMoreLoading) return;
    fetchGalleries(page + 1, true);
  };

  // 🔹 FULL PAGE LOADER
  if (loading && page === 1) {
    return (
      <div className="full-page-loader">
        <PremiumLoader />
      </div>
    );
  }

  // 🔴 EMPTY STATE (Using Reusable Component)
  if (!loading && galleries.length === 0) {
    return (
      <EmptyState 
        title="No Memories Found" 
        message="We haven't added any photos yet. Please check back later for our latest updates."
        buttonText="Back to Home"
      />
    );
  }

  return (
    <div className="gallarypage-wrapper">
      <section className="gallarypage-hero">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="gallarypage-header-content"
        >
          <span className="gallarypage-badge">OUR JOURNEY</span>
          <h1>
            Memories In <span>Frames</span>
          </h1>
          <p>A collection of our achievements and special moments.</p>
        </motion.div>
      </section>

      <div className="gallarypage-grid-container">
        {galleries.map((album, index) => (
          <motion.div
            key={`${album.id}-${index}`}
            className="gallarypage-reveal-card"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="gallarypage-main-frame">
              <img
                src={album.images?.[0]?.url}
                alt={album.title}
                className="gallarypage-bg-img"
              />

              <div className="gallarypage-content-overlay">
                <div className="gallarypage-top-info">
                  <div className="gallarypage-photo-count">
                    <FaImages /> {album.images?.length || 0}
                  </div>
                </div>

                <div className="gallarypage-bottom-info">
                  <h3>{album.title}</h3>
                </div>

                {album.images?.length > 1 && (
                  <div className="gallarypage-hidden-reveal">
                    <div className="gallarypage-reveal-grid">
                      {album.images.slice(1, 4).map((subImg, i) => (
                        <div
                          key={subImg.id || i}
                          className="gallarypage-reveal-item"
                        >
                          <img src={subImg.url} alt="sub" />
                          {i === 2 && album.images.length > 4 && (
                            <div className="gallarypage-reveal-more-overlay">
                              <span>
                                +{album.images.length - 4} More
                              </span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* LOAD MORE */}
      <LoadMoreButton
        onLoadMore={handleLoadMore}
        loading={loadMoreLoading}
        hasNextPage={page < totalPage}
        label="Load More"
      />
    </div>
  );
};

export default GallaryPage;