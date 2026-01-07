import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom"; // Navigation ke liye
import { ArrowRight, ShieldCheck } from "lucide-react"; 
import { getParentDropdown } from "services/home/PagesApis/pages"; 
import "./LifeInsuranceSection.scss";

const LifeInsuranceSection = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getParentDropdown();
        if (res.code === 200 && res.data?.products?.length > 0) {
          setProducts(res.data.products);
        }
      } catch (err) {
        console.error("API Error:", err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (!isLoading && products.length === 0) return null;
  if (isLoading) return null;

  return (
    <section className="life-ins-wrapper">
      <div className="life-container">
        <motion.div
          className="life-header"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span className="life-tag">OUR SPECIALIZATION</span>
          <h2>
            Life <span>Insurance</span> Plans
          </h2>
        </motion.div>

        <div className="life-grid">
          {products.map((plan, index) => (
            <motion.div
              className="life-card"
              key={plan.ProductID}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              onClick={() => navigate(`/insurance/${plan.ProductID}`)} // Card click navigation
              style={{ cursor: 'pointer' }}
            >
              <div className="life-card-bg"></div>

              <div className="life-content-inner">
                <div className="life-icon-box">
                  {plan.ProductImg ? (
                    <img 
                      src={plan.imageUrl} 
                      alt={plan.ProductTitle}
                      onError={(e) => { e.target.style.display = 'none'; }} 
                      className="dynamic-prod-img"
                    />
                  ) : (
                    <ShieldCheck size={30} color="#c5a059" />
                  )}
                </div>

                <h3 className="life-title-truncate" title={plan.ProductTitle}>
                  {plan.ProductTitle}
                </h3>

                <p className="life-desc-truncate" title={plan.ShortDesc}>
                  {plan.ShortDesc}
                </p>

                <button className="life-read-btn">
                  <span>Explore Plans</span>
                  <ArrowRight size={16} />
                </button>
              </div>

              <div className="life-card-number">
                {index + 1 < 10 ? `0${index + 1}` : index + 1}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LifeInsuranceSection;