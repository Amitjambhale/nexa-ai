import React, { useEffect, useState } from "react";
import "./BlogDetail.scss";
import { useParams, useNavigate } from "react-router-dom";
import {
    getBlogDetailById,
    getFeaturedBlogsList,
    getBlogsList,
} from "services/home/PagesApis/pages";
import { FaRegCalendarAlt, FaChevronRight, FaArrowLeft } from "react-icons/fa";

// Standard components
import PremiumLoader from "components/Loader/loader";
import EmptyState from "components/EmptyState/EmptyState.jsx";

const BlogDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [blog, setBlog] = useState(null);
    const [featuredBlogs, setFeaturedBlogs] = useState([]);
    const [latestBlogs, setLatestBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [scrollProgress, setScrollProgress] = useState(0);

    // Reading Progress bar logic
    useEffect(() => {
        const handleScroll = () => {
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = (window.scrollY / totalHeight) * 100;
            setScrollProgress(progress);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const fetchAllData = async () => {
        setLoading(true);
        try {
            const [detailRes, featRes, latestRes] = await Promise.all([
                getBlogDetailById({ id }),
                getFeaturedBlogsList(),
                getBlogsList({ page: 1, limit: 6 })
            ]);

            if (detailRes.code === 200) setBlog(detailRes.data);
            if (featRes.code === 200) setFeaturedBlogs(featRes.data.blogs || []);
            if (latestRes.code === 200) setLatestBlogs(latestRes.data.blogs || []);
        } catch (err) {
            console.error("Error loading blog content:", err);
        } finally {
            setLoading(false);
            window.scrollTo({ top: 0, behavior: "smooth" });
        }
    };

    useEffect(() => {
        if (id) fetchAllData();
    }, [id]);

    if (loading) return <PremiumLoader />;
    
    if (!blog) return (
        <EmptyState 
            title="Article Not Found" 
            message="The story you are looking for might have been moved or archived." 
        />
    );

    return (
        <div className="blogdetail-premium-view">
            {/* Reading Progress Line */}
            <div className="blogdetail-progress-bar" style={{ width: `${scrollProgress}%` }}></div>

            <div className="blogdetail-container">
                {/* Header Area */}
                <header className="blogdetail-header">
                    <button className="blogdetail-back-btn" onClick={() => navigate(-1)}>
                        <FaArrowLeft /> All Stories
                    </button>
                    <h1 className="blogdetail-main-title">{blog.Title}</h1>
                    <div className="blogdetail-meta-wrapper">
                        <span className="blogdetail-meta-item">
                            <FaRegCalendarAlt /> {new Date(blog.PublishedDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </span>
                    </div>
                </header>

                <div className="blogdetail-magazine-grid">
                    {/* Main Content (Left) */}
                    <main className="blogdetail-content-area">
                        <div className="blogdetail-hero-frame">
                            <img src={blog.attachmentUrl} alt={blog.Title} className="blogdetail-hero-img" />
                            <div className="blogdetail-short-desc">
                                <p>{blog.ShortDescription}</p>
                            </div>
                        </div>

                        <article 
                            className="blogdetail-rich-text" 
                            dangerouslySetInnerHTML={{ __html: blog.Description }} 
                        />

                        {/* Bottom Suggestions */}
                        <section className="blogdetail-footer-suggestions">
                            <h3 className="blogdetail-sub-heading">Latest Insights</h3>
                            <div className="blogdetail-suggest-grid">
                                {latestBlogs.length > 0 ? (
                                    latestBlogs.slice(0, 3).map(item => (
                                        <div key={item.ID} className="blogdetail-suggest-card" onClick={() => navigate(`/blog/${item.ID}`)}>
                                            <div className="blogdetail-suggest-img-box">
                                                <img src={item.attachmentUrl} alt="" />
                                            </div>
                                            <h4>{item.Title}</h4>
                                        </div>
                                    ))
                                ) : (
                                    <p className="blogdetail-empty-msg">No recent stories available.</p>
                                )}
                            </div>
                        </section>
                    </main>

                    {/* Sidebar (Right) */}
                    <aside className="blogdetail-sidebar-sticky">
                        <div className="blogdetail-sidebar-inner">
                            <h4 className="blogdetail-sidebar-label">Featured Reading</h4>
                            <div className="blogdetail-featured-list">
                                {featuredBlogs.length > 0 ? (
                                    featuredBlogs.slice(0, 4).map(fblog => (
                                        <div 
                                            key={fblog.ID} 
                                            className="blogdetail-feat-item"
                                            onClick={() => navigate(`/blog/${fblog.ID}`)}
                                        >
                                            <img src={fblog.attachmentUrl} alt="" className="blogdetail-feat-thumb" />
                                            <div className="blogdetail-feat-info">
                                                <h5>{fblog.Title}</h5>
                                                <span className="blogdetail-read-link">Read More <FaChevronRight /></span>
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="blogdetail-no-featured-box">
                                        <p>No featured articles found at this time.</p>
                                        <span>Discover more strategies in our main feed.</span>
                                    </div>
                                )}
                            </div>

                            {/* Promo Box */}
                            <div className="blogdetail-promo-box">
                                <h4>Expert Prep Tips</h4>
                                <p>Unlock exclusive strategies and deep dives by exploring our latest articles.</p>
                                <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
                                    Scroll To Top
                                </button>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default BlogDetail;