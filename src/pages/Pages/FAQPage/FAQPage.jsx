import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaPhoneAlt, FaChevronRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getFAQ } from "services/home/PagesApis/pages";
import PremiumLoader from "components/Loader/loader";
import EmptyState from "components/EmptyState/EmptyState.jsx";
import "./FAQPage.scss";

const FAQPage = () => {
  const [faqData, setFaqData] = useState([]);
  const [activeTab, setActiveTab] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFAQs = async () => {
      try {
        setLoading(true);
        const res = await getFAQ();
        if (res && res.code === 200 && res.data && res.data.faqs && res.data.faqs.length > 0) {
          setFaqData(res.data.faqs);
          setActiveTab(res.data.faqs[0].id);
        } else {
          setFaqData([]);
        }
      } catch (err) {
        console.error("Error fetching FAQs:", err);
        setFaqData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchFAQs();
  }, []);

  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, faqData]);

  if (loading) {
    return (
      <div className="faqpage-full-loader">
        <PremiumLoader />
      </div>
    );
  }

  if (faqData.length === 0) {
    return (
      <EmptyState 
        title="No FAQs Found" 
        message="We are currently updating our knowledge base. If you have any urgent questions, feel free to contact us."
        buttonText="Contact Us Now"
      />
    );
  }

  const activeFaq = faqData.find(f => f.id === activeTab);

  return (
    <div className="faqpage-wrapper">
      <div className="faqpage-header">
        <motion.span className="faqpage-tag">Knowledge Base</motion.span>
        <h1>How can we <span>help you?</span></h1>
      </div>

      <div className="faqpage-container">
        <div className="faqpage-grid">
          {/* LEFT: Sidebar with Search & Scroll */}
          <div className="faqpage-sidebar">
            <div className="sidebar-search-header">
               <div className="faq-mini-search">
                  <FaSearch />
                  <input 
                    type="text" 
                    placeholder="Search questions..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
               </div>
            </div>
            
            <div className="sidebar-scroll-area">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item) => (
                  <button 
                    key={item.id}
                    className={`faqpage-tab-btn ${activeTab === item.id ? "active" : ""}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span className="btn-icon"><FaShieldAlt /></span>
                    <span className="btn-text">{item.question}</span>
                    <FaChevronRight className="arrow" />
                  </button>
                ))
              ) : (
                <p className="no-result">No matching questions found.</p>
              )}
            </div>
          </div>

          {/* RIGHT: Content Display with Scroll */}
          <div className="faqpage-content">
            <div className="faqpage-content-scroll-area">
              <AnimatePresence mode="wait">
                <motion.div 
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="faqpage-answer-card"
                >
                  {activeFaq ? (
                    <>
                      <div className="answer-header">
                        <div className="header-icon"><FaShieldAlt /></div>
                        <h2>{activeFaq.question}</h2>
                      </div>
                      <div className="answer-body">
                        <p>{activeFaq.answer}</p>
                      </div>
                      <div className="answer-footer">
                        <p>
                          <FaPhoneAlt /> Still have questions? 
                          <strong onClick={() => navigate("/contact-us")}> Reach out to our team</strong>
                        </p>
                      </div>
                    </>
                  ) : (
                    <div className="select-prompt">Please select a question from the list.</div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQPage;