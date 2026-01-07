import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  ShieldCheck, 
  Zap, 
  ArrowRight, 
  MessageSquare, 
  CheckCircle2
} from "lucide-react";
import parse from "html-react-parser";
import "./InsuranceDetailPage.scss";
import EmptyState from "components/EmptyState/EmptyState.jsx";
import EnquiryModal from "./EnquiryModal/EnquiryModal";

const InsuranceDetailPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  
  // Modal state management
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [state]);

  if (!state || !state.currentPlan) {
    return (
   <EmptyState/>
    );
  }

  const { currentPlan, relatedPlans } = state;

  return (
    <div className="insure-details-modern-detail-root">
      {/* --- WAVE BACKGROUND --- */}
      <div className="insure-details-wave-container">
        <div className="insure-details-wave"></div>
      </div>

      {/* --- TOP HEADER NAVIGATION --- */}
      <header className="insure-details-detail-nav">
        <div className="insure-details-nav-content">
          <button onClick={() => navigate(-1)} className="insure-details-back-link">
            <ArrowLeft size={18} /> <span>Back to Plans</span>
          </button>
          
          <motion.button 
            className="insure-details-enquiry-btn-animated"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsModalOpen(true)} // Modal open trigger
          >
            <div className="insure-details-btn-wave"></div>
            <MessageSquare size={18} />
            <span>Enquire Now</span>
          </motion.button>
        </div>
      </header>

      <div className="insure-details-container">
        {/* --- HERO CONTENT SECTION --- */}
        <section className="insure-details-detail-hero-section">
          <motion.div 
            className="insure-details-hero-card-main"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="insure-details-hero-flex">
              <div className="insure-details-hero-image-holder">
                <img src={currentPlan.imageUrl} alt={currentPlan.ProductTitle} />
              </div>
              <div className="insure-details-hero-text-holder">
                <div className="insure-details-meta-tags">
                  <span className="insure-details-tag gold"><Zap size={14} /> Top Rated</span>
                  <span className="insure-details-tag navy"><ShieldCheck size={14} /> Verified Policy</span>
                </div>
                <h1>{currentPlan.ProductTitle}</h1>
                <p className="insure-details-summary-text">{currentPlan.ShortDesc}</p>
              </div>
            </div>
          </motion.div>
        </section>

        {/* --- FULL WIDTH BODY SECTION --- */}
        <section className="insure-details-main-content-body">
          <motion.div 
            className="insure-details-document-paper"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <div className="insure-details-doc-header">
              <div className="insure-details-line"></div>
              <h3>Policy Benefits & Coverage</h3>
            </div>

            <div className="insure-details-rich-description">
              {currentPlan.ProductDesc ? (
                <div className="insure-details-html-wrapper">
                  {parse(currentPlan.ProductDesc)}
                </div>
              ) : (
                <div className="insure-details-no-desc">
                  <CheckCircle2 size={40} />
                  <p>Detailed documentation for <b>{currentPlan.ProductTitle}</b> is currently being optimized for 2026 standards.</p>
                </div>
              )}
            </div>
          </motion.div>
        </section>

        {/* --- CONDITIONAL RELATED PLANS SECTION --- */}
        {relatedPlans && relatedPlans.length > 0 && (
          <section className="insure-details-related-bottom-section">
            <div className="insure-details-section-title">
              <h2>Recommended For You</h2>
            </div>

            <div className="insure-details-related-horizontal-grid">
              {relatedPlans.slice(0, 4).map((plan, index) => (
                <motion.div 
                  key={plan.ProductID}
                  className="insure-details-related-glass-card"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`/insurance-detail/${plan.ProductID}`, { 
                    state: { 
                      currentPlan: plan, 
                      relatedPlans: [...relatedPlans.filter(p => p.ProductID !== plan.ProductID), currentPlan] 
                    } 
                  })}
                >
                  <div className="insure-details-mini-card-img">
                    <img src={plan.imageUrl} alt={plan.ProductTitle} />
                  </div>
                  <div className="insure-details-mini-card-info">
                    <h4>{plan.ProductTitle}</h4>
                    <p>{plan.ShortDesc}</p>
                    <div className="insure-details-mini-card-footer">
                      <span>View Plan</span> <ArrowRight size={14} />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
      </div>

      {/* --- ENQUIRY MODAL COMPONENT --- */}
      <EnquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        productTitle={currentPlan.ProductTitle} 
      />
    </div>
  );
};

export default InsuranceDetailPage;