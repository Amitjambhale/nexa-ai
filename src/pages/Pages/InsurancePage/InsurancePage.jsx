import React, { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { geProductByParentID } from "services/home/PagesApis/pages";
import PremiumLoader from "components/Loader/loader";
import LoadMoreButton from "components/LoadMoreButton/LoadMoreButton";
import {
  ArrowRight,
  AlertCircle,
  Sparkles,
  ChevronRight,
  ShieldCheck,
  Zap,
} from "lucide-react";
import parse from "html-react-parser";
import "./InsurancePage.scss";
import EmptyState from "components/EmptyState/EmptyState.jsx";

const InsurancePage = () => {
  const { id } = useParams();
  const [parentData, setParentData] = useState(null);
  const [children, setChildren] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(false);
  const navigate = useNavigate();

  const handleDetailClick = (selectedPlan) => {
    const otherPlans = children.filter(
      (item) => item.ProductID !== selectedPlan.ProductID
    );

    navigate(`/insurance-detail/${selectedPlan.ProductID}`, {
      state: {
        currentPlan: selectedPlan,
        relatedPlans: otherPlans,
      },
    });
  };

  const fetchProducts = useCallback(
    async (p, isLoadMore = false) => {
      try {
        if (isLoadMore) setIsFetching(true);
        const res = await geProductByParentID({
          parentid: id,
          page: p,
          limit: 10,
        });
        if (res.code === 200 && res.data) {
          setParentData(res.data.parent);
          setChildren((prev) =>
            isLoadMore ? [...prev, ...res.data.children] : res.data.children
          );
          setHasMore(res.data.children.length === 10);
          if (isLoadMore) setPage(p);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
        setIsFetching(false);
      }
    },
    [id]
  );

  useEffect(() => {
    fetchProducts(1, false);
    window.scrollTo(0, 0);
  }, [fetchProducts]);

  if (loading) return <PremiumLoader />;

  // Case 1: No Parent Data (Full Empty State)
  if (!parentData)
    return (
      <EmptyState
        title="Insurance Category Not Found"
        message="Hume is category ki details nahi mili. Ho sakta hai ye category update ho rahi ho."
        buttonText="Back to Home"
      />
    );

  return (
    <div className="elevate-ins-root">
      {/* --- HERO SECTION --- */}
      <section className="elevate-hero">
        <div className="container">
          <motion.div
            className="hero-wrapper"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="hero-img-capsule">
              <img src={parentData.imageUrl} alt="Main" />
              {/* <div className="floating-badge">
                <Sparkles size={14} /> Official Portfolio
              </div> */}
            </div>
            <div className="hero-info">
              <div className="breadcrumb">
                Insurance <ChevronRight size={14} /> {parentData.ProductTitle}
              </div>
              <h1>{parentData.ProductTitle}</h1>
              <div className="hero-desc">
                {parentData.ShortDesc}
                {/* {parentData.ProductDesc && (
                  <div className="rich-text">{parse(parentData.ProductDesc)}</div>
                )} */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- PLANS LIST SECTION (FULL WIDTH CARDS) --- */}
      <section className="plans-list-section">
        <div className="container">
          <div className="section-title">
            <Zap size={18} color="#c5a059" />
            <span>Available Provisions</span>
            <div className="small-line"></div>
          </div>

          <div className="horizontal-stack">
            <AnimatePresence>
              {children.length > 0 ? (
                children.map((child, index) => (
                  <motion.div
                    className="wide-card"
                    key={child.ProductID}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                  >
                    <div className="card-image-box">
                      <img src={child.imageUrl} alt={child.ProductTitle} />
                    </div>
                    <div className="card-details-box">
                      <div className="top-meta">
                        {/* <span className="id-tag">REF-{child.ProductID}</span> */}
                        <div className="status">
                          <ShieldCheck size={14} /> Active
                        </div>
                      </div>
                      <h3>{child.ProductTitle}</h3>
                      <p>{child.ShortDesc}</p>
                      <div className="card-actions">
                        <button
                          className="primary-link"
                          onClick={() => handleDetailClick(child)}
                        >
                          Read More <ArrowRight size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                // Case 2: No Children Data (Inner Empty State)
                <motion.div
                  className="no-plans-alert"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <AlertCircle size={48} color="#94a3b8" />
                  <h3>
                    No Active {parentData.ProductTitle} found at this time.
                  </h3>
                  <p>
                    {" "}
                    Our team is actively updating new insurance options. Please
                    check back again soon.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {hasMore && (
            <div className="load-more-center">
              <LoadMoreButton
                onLoadMore={() => fetchProducts(page + 1, true)}
                loading={isFetching}
                hasNextPage={hasMore}
              />
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default InsurancePage;
