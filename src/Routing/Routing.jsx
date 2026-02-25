import React from "react";
import { Routes, Route } from "react-router-dom";

// Layouts
// import MainLayout from "components/layouts/MainLayout";
import NoLayout from "components/layouts/NoLayout";
import Home from "pages/home/Home";
import NotFound from "pages/pageNotFound/NotFound";
import AboutUsPage from "pages/Pages/AboutUsPage/AboutUsPage";
import FAQPage from "pages/Pages/FAQPage/FAQPage";
import ContactUsPage from "pages/Pages/ContactUsPage/ContactUsPage";
import TestimonialsPage from "pages/Pages/TestimonialsPage/TestimonialsPage.jsx";
import MainLayout from "components/layouts/MainLayout";

// Pages

const Routing = () => {
  return (
    <Routes>
      {/* PAGES WITH HEADER + FOOTER */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/contact-us" element={<ContactUsPage />} />
        <Route path="/testimonials" element={<TestimonialsPage />} />
       
        
      </Route>

      {/* PAGES WITHOUT ANY LAYOUT */}
      <Route element={<NoLayout />}>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default Routing;
