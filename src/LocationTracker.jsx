import { useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { getSeo } from "services/home/seo";
import { errorResponse, failResponse } from "config/config";

const LocationTracker = () => {
  const location = useLocation();
  const [currentPath, setCurrentPath] = useState(location.pathname);
  const [metakeywords, setmetakeywords] = useState("");
  const [metatitle, setmetatitle] = useState("");
  const [metadescription, setmetadescription] = useState("");
  const [metacanonocaltag, setmetacanonocaltag] = useState("");
  const [jsonscript, setjsonscript] = useState("");

  useEffect(() => {
    setCurrentPath(location.pathname); // Update currentPath when location changes
  }, [location]);

  // Fetch SEO details on path change
  useEffect(() => {
    const fetchSeoDetails = async () => {
      try {
        const res = await getSeo({ path: currentPath }); // ✅ Send path as param

        if (res.code === 200 && res.data && res.data.seodetail) {
          const seodetail = res.data.seodetail;
          setmetatitle(seodetail.metatitle || "");
          setmetakeywords(seodetail.metakeywords || "");
          setmetadescription(seodetail.metadescription || "");
          setmetacanonocaltag(seodetail.metacanonocaltag || "");
          setjsonscript(seodetail.jsonscript || "");
        } else {
          // ✅ Reset meta to default if no data found
          setmetatitle("");
          setmetakeywords("");
          setmetadescription("");
          setmetacanonocaltag("");
          setjsonscript("");
          // failResponse(res);
        }
      } catch (err) {
        // ✅ Reset to default on error too
        setmetatitle("");
        setmetakeywords("");
        setmetadescription("");
        setmetacanonocaltag("");
        setjsonscript("");
        // errorResponse(err);
      }
    };

    fetchSeoDetails();
  }, [currentPath]); // Re-run the effect when currentPath changes

  return (
    <>
      <Helmet>
        <title>{metatitle || "Holly Minds"}</title>
        <meta
          name="description"
          content={
            metadescription ||
            "Holly Minds is a leading logo design and branding company in Pune, India. We specialize in creative logo design, brand identity development, graphic design, digital branding, and marketing solutions that help businesses build a strong and memorable brand presence."
          }
        />
        {/* <meta name="keywords" content={metakeywords || "IAS academy, IAS coaching, best IAS coaching in India, IAS coaching classes, civil service coaching, upsc coaching, best coaching for IAS, top IAS coaching in Delhi, best upsc coaching in India, upsc classes, top IAS coaching in India, upsc coaching in Delhi, best upsc coaching in Delhi, IAS coaching centre in Delhi, psir online coaching, online IAS coaching, online IAS academy, upsc online coaching classes, civil service coaching, psir optional online classes"} /> */}
        <link
          rel="canonical"
          href={metacanonocaltag || "https://www.hollyminds.com/"}
        />
        <script type="application/ld+json">{jsonscript}</script>
      </Helmet>

      {/* 
      {currentPath === "/freeresources/FRPrelimsSyllabus" && (
        <Helmet>
          <title>FR Prelims Syllabus</title>
          <meta name="description" content="This is the syllabus page description" />
          <meta name="keywords" content="free resources, syllabus, SEO" />
        </Helmet>
      )}

      {currentPath === "/freeresources/FRPrelimsPYQPrelims" && (
        <Helmet>
          <title>FR Prelims PYQ</title>
          <meta name="description" content="This is the Prelims page description" />
          <meta name="keywords" content="free resources, prelims, SEO" />
        </Helmet>
      )}

      {currentPath.includes("/course-detail") && (
        <Helmet>
          <title>Course Detail</title>
          <meta name="description" content="This is the Course Detail description" />
          <meta name="keywords" content="free resources, course, SEO" />
        </Helmet>
      )} 
      */}
    </>
  );
};

export default LocationTracker;
