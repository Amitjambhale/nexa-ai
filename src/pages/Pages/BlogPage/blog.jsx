import React, { useRef, useEffect, useState } from "react";
import "./BlogPage.scss";
import { getBlogsList, getFeaturedBlogsList } from "services/home/PagesApis/pages";
import { Link, useNavigate } from "react-router-dom";

// Standard Components
import PremiumLoader from "components/Loader/Loader";
import LoadMoreButton from "components/LoadMoreButton/LoadMoreButton";
import EmptyState from "components/EmptyState/EmptyState.jsx";

const BlogPage = () => {
  const [blogs, setBlogs] = useState([]);
  const [featuredBlogs, setFeaturedBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [archiveSlide, setArchiveSlide] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  
  const postsPerPage = 4;
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [loadMoreClicked, setLoadMoreClicked] = useState(false);

  // ✅ Fix: Handle scroll status without re-triggering on blog updates
  useEffect(() => {
    const handleScrollStatus = () => {
      if (!scrollRef.current) return;
      const { scrollTop, scrollHeight, clientHeight } = scrollRef.current;
      setIsAtTop(scrollTop <= 5);
      setIsAtBottom(scrollTop + clientHeight >= scrollHeight - 5);
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener("scroll", handleScrollStatus);
      handleScrollStatus();
      return () => container.removeEventListener("scroll", handleScrollStatus);
    }
  }, [blogs.length]); // Only re-run when length changes to update arrows

  const scrollUp = () => scrollRef.current?.scrollBy({ top: -400, behavior: "smooth" });
  const scrollDown = () => scrollRef.current?.scrollBy({ top: 400, behavior: "smooth" });

  const fetchBlogs = async (page = 1) => {
    try {
      setIsFetching(true);
      const res = await getBlogsList({ page, limit: postsPerPage });
      if (res.code === 200 && res.data?.blogs) {
        let newBlogs = res.data.blogs || [];
        setBlogs((prev) => {
          const combined = page === 1 ? newBlogs : [...prev, ...newBlogs];
          const uniqueBlogs = combined.filter((blog, index, self) => 
            self.findIndex((b) => b.ID === blog.ID) === index
          );
          return uniqueBlogs.sort((a, b) => (a.DisplayOrder || 999) - (b.DisplayOrder || 999));
        });
        setHasMore(page < (res.data.totalPages || 1));
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
      setIsFetching(false);
    }
  };

  const fetchFeaturedBlogs = async () => {
    try {
      const res = await getFeaturedBlogsList();
      if (res.code === 200 && res.data?.blogs) setFeaturedBlogs(res.data.blogs);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchBlogs(1);
    fetchFeaturedBlogs();
  }, []);

  // Auto-sliders
  useEffect(() => {
    if (blogs.length === 0) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % blogs.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  useEffect(() => {
    if (blogs.length === 0) return;
    const interval = setInterval(() => {
      setArchiveSlide((prev) => (prev + 1) % Math.min(blogs.length, 10));
    }, 3000);
    return () => clearInterval(interval);
  }, [blogs.length]);

  // ✅ Fix: Load More without jumping to end
  const handleLoadMore = async () => {
    const nextPage = currentPage + 1;
    await fetchBlogs(nextPage);
    setCurrentPage(nextPage);
    setLoadMoreClicked(true);
    
    // Position slightly down so user knows new content is there
    setTimeout(() => {
      scrollRef.current?.scrollBy({ top: 100, behavior: "smooth" });
    }, 100);
  };

  if (loading) return <PremiumLoader />;

  if (blogs.length === 0) return (
    <EmptyState 
      title="No Blogs Available" 
      message="We're currently crafting some amazing stories. Check back soon!" 
    />
  );

  return (
    <div className="blogpage-editorial-theme">
      {/* HEADER SECTION */}
      <header className="blogpage-page-header">
        <div className="blogpage-container">
          <div className="blogpage-header-flex">
            <div className="blogpage-title-area">
              <h1>Insights & <span className="blogpage-gold-txt">Strategies</span></h1>
              <p>Elevate your journey with our latest editorial content.</p>
            </div>
            
            <div className="blogpage-latest-posts-slider" onClick={() => navigate(`/blog/${blogs[currentSlide].ID}`)}>
               <div className="blogpage-slide-content">
                  <span className="blogpage-badge">LATEST POST</span>
                  <h3>{blogs[currentSlide]?.Title}</h3>
                  <p className="blogpage-latest-desc-truncate">{blogs[currentSlide]?.ShortDescription}</p>
               </div>
            </div>
          </div>
        </div>
      </header>

      <div className="blogpage-container blogpage-main-grid">
        
        {/* LEFT COLUMN: Main Feed */}
        <div className="blogpage-feed-column">
          <div className="blogpage-section-label">Main Feed</div>
          
          <div className="blogpage-scroll-container-wrapper">
             <div className="blogpage-blog-scroll-area" ref={scrollRef}>
                {blogs.map((blog) => (
                  <article key={blog.ID} className="blogpage-feed-card">
                    <div className="blogpage-img-holder">
                      <img src={blog.attachmentUrl} alt={blog.Title} />
                    </div>
                    <div className="blogpage-text-holder">
                      <h3 className="blogpage-title-2-line">
                        <Link to={`/blog/${blog.ID}`}>{blog.Title}</Link>
                      </h3>
                      <p className="blogpage-desc-truncate">{blog.ShortDescription}</p>
                      <div className="blogpage-meta">
                        <span>Expert Prep</span> • <span>5 min read</span>
                      </div>
                    </div>
                  </article>
                ))}
             </div>

             {loadMoreClicked && (
                <div className="blogpage-scroll-nav">
                  <button onClick={scrollUp} disabled={isAtTop} className="blogpage-nav-btn">↑</button>
                  <button onClick={scrollDown} disabled={isAtBottom} className="blogpage-nav-btn">↓</button>
                </div>
             )}
          </div>

          <LoadMoreButton 
            onLoadMore={handleLoadMore} 
            loading={isFetching} 
            hasNextPage={hasMore} 
            label="Load More Articles"
          />
        </div>

        {/* RIGHT COLUMN: Sidebar */}
        <aside className="blogpage-sidebar-column">
          
          <div className="blogpage-sidebar-widget">
            <h4 className="blogpage-widget-title">Featured Articles</h4>
            <div className="blogpage-featured-list">
              {featuredBlogs.length > 0 ? (
                featuredBlogs.slice(0, 4).map((fBlog) => (
                  <Link to={`/blog/${fBlog.ID}`} key={fBlog.ID} className="blogpage-f-item">
                    <div className="blogpage-f-img">
                      <img src={fBlog.attachmentUrl} alt="" />
                    </div>
                    <div className="blogpage-f-info">
                      <h5 className="blogpage-title-2-line">{fBlog.Title}</h5>
                    </div>
                  </Link>
                ))
              ) : (
                <div className="blogpage-no-featured">
                  <p>No featured articles found at this time.</p>
                  <span>We are hand-picking the best stories for you. Stay tuned!</span>
                </div>
              )}
            </div>
          </div>

          <div className="blogpage-sidebar-widget">
            <h4 className="blogpage-widget-title">Discover More</h4>
            <div className="blogpage-discover-auto-slider">
              {blogs[archiveSlide] && (
                <div className="blogpage-discover-card-single" onClick={() => navigate(`/blog/${blogs[archiveSlide].ID}`)}>
                  <div className="blogpage-discover-img">
                    <img src={blogs[archiveSlide].attachmentUrl} alt={blogs[archiveSlide].Title} />
                  </div>
                  <div className="blogpage-discover-content">
                    <h5 className="blogpage-title-2-line">{blogs[archiveSlide].Title}</h5>
                    <p className="blogpage-desc-truncate">{blogs[archiveSlide].ShortDescription}</p>
                    <span className="blogpage-read-more-link">Read Story →</span>
                  </div>
                </div>
              )}
            </div>
          </div>

        </aside>
      </div>
    </div>
  );
};

export default BlogPage;