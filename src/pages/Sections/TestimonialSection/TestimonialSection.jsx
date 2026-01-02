import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getTestimonials } from "services/home/SectionsApis/sectionsapi"; // Path check kar lein
import "./TestimonialSection.scss";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await getTestimonials();
        if (res && res.code === 200 && res.data && res.data.testimonials && res.data.testimonials.length > 0) {
          // Sirf pehle 3 testimonials dikhane ke liye slice use kiya hai
          setTestimonials(res.data.testimonials.slice(0, 3));
        } else {
          setTestimonials([]);
        }
      } catch (err) {
        console.error("Error fetching testimonials:", err);
        setTestimonials([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  // Loading state (Optional: return null to keep it hidden during load)
  if (loading) return null;

  // Agar data empty hai toh poora section gayab (return null)
  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section className="v2-testimonial-section">
      <div className="container">
        <header className="v2-header">
          <motion.h2 
            className="v2-title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Trust <span>Voices</span>
          </motion.h2>
          <motion.span 
            className="v2-tag"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            Hear the voices of trust and security from those who have walked this journey with us.
          </motion.span>
        </header>

        <div className="v2-grid">
          {testimonials.map((item, idx) => (
            <motion.div
              className="v2-card"
              key={item.ID}
              layout 
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              whileHover={{ y: -10 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ 
                duration: 0.5, 
                delay: idx * 0.1,
                type: "spring",
                stiffness: 100 
              }}
            >
              <div className="v2-card-content">
                <div className="v2-img-container">
                  {/* API field 'imageUrl' use ho raha hai */}
                  <img src={item.imageUrl} alt={item.Name} />
                </div>

                {/* API field 'Description' use ho raha hai */}
                <p className="v2-text">"{item.Description}"</p>

                <div className="v2-footer">
                  <div className="v2-line"></div>
                  {/* API field 'Name' use ho raha hai */}
                  <h4 className="v2-name">{item.Name}</h4>
                </div>
              </div>

              <div className="v2-card-glow"></div>
            </motion.div>
          ))}
        </div>

        <motion.div className="testimonial-footer">
          <button className="view-all-btn" onClick={() => navigate("/testimonials")}>
            <LayoutGrid size={20} /> View All Testimonials
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;