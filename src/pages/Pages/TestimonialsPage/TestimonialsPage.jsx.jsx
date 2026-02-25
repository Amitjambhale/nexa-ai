import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaQuoteRight, FaCheckCircle, FaChevronUp, FaChevronDown } from "react-icons/fa";
import PremiumLoader from "components/Loader/loader";
import EmptyState from "components/EmptyState/EmptyState.jsx";
import "./TestimonialsPage.scss";

const dummyTestimonials = [
  { ID: 1, Name: "Rahul Sharma", Description: "This platform completely transformed our workflow. The UI is clean, fast, and extremely professional.", imageUrl: "https://i.pravatar.cc/300?img=12", Role: "CEO @ TechFlow" },
  { ID: 2, Name: "Anjali Mehta", Description: "Best SaaS dashboard experience I’ve used. Smooth animations and modern design impressed our clients.", imageUrl: "https://i.pravatar.cc/300?img=5", Role: "Product Designer" },
  { ID: 3, Name: "David Wilson", Description: "Highly scalable and beautifully designed template. Perfect for startups and AI products.", imageUrl: "https://i.pravatar.cc/300?img=8", Role: "Fullstack Developer" },
  { ID: 4, Name: "Sarah Jenkins", Description: "The integration process was seamless. Our efficiency increased by 40% in the first month.", imageUrl: "https://i.pravatar.cc/300?img=9", Role: "Operations Manager" },
  { ID: 5, Name: "Amit Patel", Description: "A game changer for our marketing team. The analytics dashboard is top-notch.", imageUrl: "https://i.pravatar.cc/300?img=15", Role: "Marketing Head" },
  { ID: 6, Name: "Sophia Chen", Description: "Customer support is incredible. They helped us customize the platform to our exact needs.", imageUrl: "https://i.pravatar.cc/300?img=20", Role: "Startup Founder" },
  { ID: 7, Name: "James Cook", Description: "Exceptional quality. The codebase is so easy to maintain and scale.", imageUrl: "https://i.pravatar.cc/300?img=11", Role: "CTO @ Innovate" },
  { ID: 8, Name: "Priya Das", Description: "The best investment we made this year for our digital presence.", imageUrl: "https://i.pravatar.cc/300?img=16", Role: "Creative Director" },
  { ID: 9, Name: "Mark Taylor", Description: "The automation tools saved us hours of manual data entry. Highly recommended!", imageUrl: "https://i.pravatar.cc/300?img=3", Role: "SaaS Founder" },
  { ID: 10, Name: "Elena Gilbert", Description: "Beautifully organized components. It's a breeze to customize the theme.", imageUrl: "https://i.pravatar.cc/300?img=21", Role: "UI/UX lead" },
  { ID: 11, Name: "Vikram Singh", Description: "Performance is blazing fast even with heavy data loads.", imageUrl: "https://i.pravatar.cc/300?img=18", Role: "Backend Dev" },
  { ID: 12, Name: "Sarah Connor", Description: "Finally a tool that understands the needs of modern startups.", imageUrl: "https://i.pravatar.cc/300?img=22", Role: "Product Manager" },
];

const TestimonialsPage = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(6); // ✅ Pehle 6 dikhao
  const [isExpanding, setIsExpanding] = useState(false);

  useEffect(() => {
    // Initial fetch simulation
    setTimeout(() => {
      setTestimonials(dummyTestimonials);
      setLoading(false);
    }, 800);
  }, []);

  const handleToggle = () => {
    setIsExpanding(true);

    setTimeout(() => {
      if (visibleCount >= testimonials.length) {
        setVisibleCount(6); // ✅ Reset to 6
        // Smooth scroll to top of section
        const section = document.getElementById('testimonials-section');
        if (section) {
          window.scrollTo({ top: section.offsetTop - 80, behavior: 'smooth' });
        }
      } else {
        setVisibleCount(prev => prev + 6); // ✅ Next 6 load karo
      }
      setIsExpanding(false);
    }, 500);
  };

  if (loading) return <div className="testimonial-loader"><PremiumLoader /></div>;
  if (testimonials.length === 0) return <EmptyState title="No Testimonials" message="Feedback coming soon." />;

  const isLastPage = visibleCount >= testimonials.length;

  return (
    <section className="saas-testimonials" id="testimonials-section">
      <div className="bg-blur-effect"></div>

      <div className="container">
        <header className="testimonial-header">
          <span className="badge">Wall of Love</span>
          <h2>Trusted by the <span>World's Best Teams</span></h2>
          <p>Hear from the leaders building the future with our AI-powered SaaS platform.</p>
        </header>

        <div className="testimonial-masonry">
          <AnimatePresence mode="popLayout">
            {testimonials.slice(0, visibleCount).map((item, index) => (
              <motion.div
                key={item.ID}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="testimonial-card"
              >
                <div className="card-top">
                  <div className="stars">
                    {[...Array(5)].map((_, i) => <FaStar key={i} />)}
                  </div>
                  <FaQuoteRight className="quote-icon" />
                </div>

                <p className="review">"{item.Description}"</p>

                <div className="client-info">
                  <div className="avatar-wrapper">
                    <img src={item.imageUrl} alt={item.Name} />
                    <FaCheckCircle className="verified-badge" />
                  </div>
                  <div className="details">
                    <h4>{item.Name}</h4>
                    <span>{item.Role}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <div className="load-more-container">
          <button
            className={`premium-toggle-btn ${isLastPage ? 'show-less' : ''}`}
            onClick={handleToggle}
            disabled={isExpanding}
          >
            {isExpanding ? (
              <div className="mini-loader"></div>
            ) : (
              <>
                {isLastPage ? 'Show Less' : 'Load More Reviews'}
                {isLastPage ? <FaChevronUp /> : <FaChevronDown />}
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsPage;