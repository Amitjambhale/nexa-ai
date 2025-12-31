import React from "react";
import { motion } from "framer-motion";
import { LayoutGrid, MoveRight } from "lucide-react";
import "./BlogSection.scss";

const blogData = [
  {
    id: 1,
    title: "Why LIC is the Safest Investment in 2025",
    desc: "Discover why millions of Indians trust LIC for their family's long-term financial security through guaranteed returns and sovereign guarantee.",
    date: "Dec 28, 2025",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "MDRT 2026: A Roadmap for LIC Agents",
    desc: "Step-by-step guide for insurance advisors to achieve the prestigious MDRT global recognition and boost their professional career.",
    date: "Dec 25, 2025",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Tax Saving Under Section 80C & 10(10D)",
    desc: "Learn how to maximize your tax benefits through smart life insurance planning this year and save your hard-earned money effectively.",
    date: "Dec 20, 2025",
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=500&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Digital Prospecting for Modern Advisors",
    desc: "How to use social media and digital tools to find new clients without cold calling and build a strong online presence.",
    date: "Dec 15, 2025",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
  }
];

const BlogSection = () => {
  return (
    <section className="simple-blog-section">
      <div className="container">
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
          {blogData.map((item, index) => (
            <motion.div 
              key={item.id} 
              className="blog-item"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="img-container">
                <img src={item.image} alt={item.title} />
              </div>
              <div className="text-content">
                <h3 className="blog-title">{item.title}</h3>
                <p className="blog-desc">{item.desc}</p>
                <span className="blog-date">{item.date}</span>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="footer-action"
        >
          <button className="explore-btn">
            <LayoutGrid size={20} /> View All Blogs
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogSection;