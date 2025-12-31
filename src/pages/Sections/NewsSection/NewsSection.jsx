import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaShieldAlt, FaExternalLinkAlt, FaClock } from "react-icons/fa";
import "./NewsSection.scss";

// ✅ Multiple Proxies ka array (Agar ek block ho toh dusra try karega)
const PROXIES = [
  "https://api.allorigins.win/raw?url=",
  "https://corsproxy.io/?",
  "https://thingproxy.freeboard.io/fetch/"
];

const RSS_FEED = "https://news.google.com/rss/search?q=insurance+sector+india+when:7d&hl=en-IN&gl=IN&ceid=IN:en";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      let success = false;
      
      for (let proxy of PROXIES) {
        if (success) break;
        try {
          const response = await fetch(proxy + encodeURIComponent(RSS_FEED));
          if (!response.ok) throw new Error("Proxy failed");
          
          const xmlText = await response.text();
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(xmlText, "text/xml");
          const items = xmlDoc.querySelectorAll("item");

          const parsedNews = Array.from(items).slice(0, 6).map((el) => {
            const fullTitle = el.querySelector("title")?.textContent || "";
            const parts = fullTitle.split(" - ");
            const source = parts.pop();
            const title = parts.join(" - ");

            return {
              title: title || fullTitle,
              source: source || "Insurance Update",
              link: el.querySelector("link")?.textContent,
              date: el.querySelector("pubDate")?.textContent,
            };
          });

          setNews(parsedNews);
          setLoading(false);
          success = true;
        } catch (err) {
          console.warn(`Proxy ${proxy} failed, trying next...`);
        }
      }

      if (!success) {
        setLoading(false);
        // Fallback static news agar sab fail ho jaye
        setNews([{
          title: "Market Insight: Insurance sector poised for growth in 2024",
          source: "Industry Expert",
          date: new Date().toISOString(),
          link: "#"
        }]);
      }
    };

    fetchNews();
  }, []);

  if (loading) return  <div className="news-loading">
      <div className="pulse-loader"></div>
      <p>Fetching Live Insurance Intel...</p>
    </div>

  return (
    <section className="insurance-news-hub">
      <div className="news-container">
        <header className="news-head">
          <div className="title-box">
             <FaShieldAlt className="main-icon" />
             <h2>Insurance News Intelligence</h2>
          </div>
        </header>

        <div className="news-grid-modern">
          {news.map((item, index) => (
            <motion.a
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              key={index}
              className="news-card-premium"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="card-top">
                <span className="source-tag">{item.source}</span>
                <span className="date-tag"><FaClock /> {new Date(item.date).toLocaleDateString()}</span>
              </div>
              <h3>{item.title}</h3>
              <div className="card-footer">
                <span>Detailed News</span>
                <FaExternalLinkAlt />
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;