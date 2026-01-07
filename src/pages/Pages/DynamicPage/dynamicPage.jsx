import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDynamicPages } from "services/home/PagesApis/pages";
import "./dynamicPage.scss";
import NotFound from "pages/pageNotFound/NotFound";
import PremiumLoader from "components/Loader/Loader";

const DynamicPage = () => {
  const { dynamicpage } = useParams();
  const [loading, setLoading] = useState(true);
  const [pageData, setPageData] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        setLoading(true);
        const res = await getDynamicPages({ path: `/${dynamicpage}` });
        if (res?.code === 200) {
          setPageData(res.data);
        } else {
          console.error("Failed to load page content");
        }
      } catch (err) {
        console.error("Error fetching page:", err);
      } finally {
        setLoading(false);
      }
    };
    if (dynamicpage) fetchPage();
  }, [dynamicpage]);

  if (loading) return <PremiumLoader />;

  if (!pageData) return <NotFound />;

  return (
    <div className="dynamic-page-wrapper">
      {/* Dynamic Page Header / Hero */}
      <header className="dynamic-page-hero">
        <div className="dynamic-page-container">
          <div className="dynamic-page-hero-content">
            <h1 className="dynamic-page-title">{pageData.PageName}</h1>
            {pageData.MetaDescription && (
              <p className="dynamic-page-subtitle">{pageData.MetaDescription}</p>
            )}
            <div className="dynamic-page-breadcrumb">
            </div>
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="dynamic-page-shape-1"></div>
        <div className="dynamic-page-shape-2"></div>
      </header>

      {/* Main Content Body */}
      <main className="dynamic-page-main-content">
        <div className="dynamic-page-container">
          <div className="dynamic-page-card">
            <article
              className="dynamic-page-article-body"
              dangerouslySetInnerHTML={{ __html: pageData.Description }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default DynamicPage;