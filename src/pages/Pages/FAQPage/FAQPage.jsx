import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaPhoneAlt, FaChevronRight, FaSearch } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./FAQPage.scss";

const FAQPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const faqData = [
    {
      id: 0,
      icon: <FaShieldAlt />,
      q: "Why Life Insurance?",
      a: "Buying life insurance protects for your dependents after you. It provides financial security, helps to pay off debts, live life smoothly even after you. Life insurance can give you lasting peace of mind in terms of the assurance that you have provided a legacy. It gives… Guaranteed protection, Income replacement, Guaranteed cash value growth"
    },
    {
      id: 1,
      icon: <FaShieldAlt />,
      q: "Why LIC Life Insurance Plans?",
      a: "LIC is one of the largest insurance companies in India which offers wide range of life insurance plans. LIC offers term plans with affordable premiums and high coverage. LIC has good Claim Settlement ratio compare to other Life Insurance Companies. It has raised Trust over the years. With its customer-centric approach, LIC has become one of the top Life Insurers in India, and 5th largest in the world. For more details, you can call me on my given number in Contact Us page."
    },
    {
      id: 2,
      icon: <FaShieldAlt />,
      q: "Why Health Insurance?",
      a: "We never know because Emergency never knocks, it comes suddenly. Risinsg medical costs shouldn’t be the hurdle to get superior medical treatment. We should have Health Insurance because it protects our savings during medical emergencies. It provides cashless claim benefit, which allows you to take care of your health instead of worrying about hefty medical bills."
    },
    {
      id: 3,
      icon: <FaShieldAlt />,
      q: "How to pay Premium Online?",
      a: (
        <>
          You can pay premium online by clicking on the link given below. <a href="https://licindia.in/Home/Pay-Premium-Online" target="_blank" rel="noreferrer">https://licindia.in/Home/Pay-Premium-Online</a> It will redirect you on LIC website. If you don’t want to register then you can select ‘Pay Direct’ option.
          <ul className="faq-list">
            <li>Select Renewal option from the drop down list.</li>
            <li>Put Policy No, DOB, Mobile Number, Email id & Premium (without any tax)</li>
            <li>And Pay the Premium For more assistance, you can call me, please Refer Contact Us page.</li>
          </ul>
        </>
      )
    },
    {
      id: 4,
      icon: <FaShieldAlt />,
      q: "How to update Address?",
      a: (
        <>
          You can update your Contact Address on your policy based on Offline Aadhaar. Tap on the below given link and follow the process. <a href="https://ebiz.licindia.in/D2CPM/?_ga=2.155407163.1855131267.1643959747-1137006311.1629281366#SelfAddressChange" target="_blank" rel="noreferrer">Click here for Self Address Change</a> For more assistance, you can call me, please Refer Contact Us page.
        </>
      )
    },
    {
      id: 5,
      icon: <FaShieldAlt />,
      q: "How to change Nomination in the Policy?",
      a: (
        <>
          Changing the nominee in LIC policy is a simple process. You need to notify the Life Insurance Corporation of India by filing form 3750. Documents required for nominee change:
          <ul className="faq-list">
            <li>Form 3750</li>
            <li>The relationship proof between the policyholder and the person being nominated.</li>
            <li>Policy contract (for endorsement).</li>
            <li>The LIC policy photocopy You can make this change multiple times during your policy term. For more assistance, you can call me on my given number in Contact Us page.</li>
          </ul>
        </>
      )
    },
    
  ];

  // Search Logic
  const filteredFaqs = useMemo(() => {
    return faqData.filter(faq => 
      faq.q.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery]);

  return (
    <div className="faqpage-wrapper">
      <div className="faqpage-header">
        <motion.span className="faqpage-tag">Knowledge Base</motion.span>
        <h1>How can we <span>help you?</span></h1>
        
        <div className="faq-search-box">
          <FaSearch />
          <input 
            type="text" 
            placeholder="Search your question here..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="faqpage-container">
        <div className="faqpage-grid">
          {/* LEFT: Sidebar with Scroll */}
          <div className="faqpage-sidebar">
            <div className="sidebar-inner">
              {filteredFaqs.length > 0 ? (
                filteredFaqs.map((item) => (
                  <button 
                    key={item.id}
                    className={`faqpage-tab-btn ${activeTab === item.id ? "active" : ""}`}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <span className="btn-icon">{item.icon}</span>
                    <span className="btn-text">{item.q}</span>
                    <FaChevronRight className="arrow" />
                  </button>
                ))
              ) : (
                <p className="no-result">No questions found.</p>
              )}
            </div>
          </div>

          {/* RIGHT: Content Display */}
          <div className="faqpage-content">
            <AnimatePresence mode="wait">
              <motion.div 
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="faqpage-answer-card"
              >
                {faqData.find(f => f.id === activeTab) ? (
                  <>
                    <div className="answer-header">
                      <div className="header-icon">{faqData.find(f => f.id === activeTab).icon}</div>
                      <h2>{faqData.find(f => f.id === activeTab).q}</h2>
                    </div>
                    <div className="answer-body">
                      <p>{faqData.find(f => f.id === activeTab).a}</p>
                    </div>
                    <div className="answer-footer">
                      <p>
                        <FaPhoneAlt /> Need more help? 
                        <strong onClick={() => navigate("/contact-us")}> Contact Us</strong>
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
  );
};

export default FAQPage;