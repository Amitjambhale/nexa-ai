import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { LayoutGrid } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getBlogsList } from "services/home/PagesApis/pages";
import "./BlogSection.scss";

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await getBlogsList({ page: 1, limit: 4 });
        // Handling decryptData(response) format
        if (res && res.code === 200 && res.data && res.data.blogs && res.data.blogs.length > 0) {
          setBlogs(res.data.blogs);
        } else {
          setBlogs([]);
        }
      } catch (err) {
        console.error("Blog Section Fetch Error:", err);
        setBlogs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  // Condition: Agar API khali aaye toh poora section hi render mat karo
  if (!loading && blogs.length === 0) return null;

  // Helper to format date
  const formatDate = (dateStr) => {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <section className="simple-blog-section">
      <div className="blog-section-container">
        <header className="gal-header">
          <motion.h2 
            className="title"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Knowledge <span>Insights</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Step into our library of wisdom and professional growth through these stories of knowledge and inspiration.
          </motion.p>
        </header>

        <div className="blog-grid">
          {blogs.map((item, index) => (
            <motion.div 
              key={item.ID} 
              className="blog-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onClick={() => navigate(`/blog/${item.ID}`)}
            >
              <div className="img-container">
                <img src={item.attachmentUrl} alt={item.Title} />
              </div>
              <div className="text-content">
                <h3 className="blog-title">{item.Title}</h3>
                <p className="blog-desc">{item.ShortDescription}</p>
                <span className="blog-date">{formatDate(item.PublishedDate)}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div className="footer-action">
          <button className="explore-btn" onClick={() => navigate("/blogs")}>
            <LayoutGrid size={20} /> View All Blogs
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;