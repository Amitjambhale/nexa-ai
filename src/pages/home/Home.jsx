import React from "react";
import "./Home.scss";
import HeroSection from "pages/Pages/HeroPage/HeroSection";
import FeaturesSection from "pages/Pages/FeaturesPage/FeaturesSection";
import PricingSection from "pages/Pages/PricingPage/PricingSection";
import FAQPage from "pages/Pages/FAQPage/FAQPage";
import TestimonialsPage from "pages/Pages/TestimonialsPage/TestimonialsPage.jsx";
import CTASection from "pages/Pages/CtaPage/CTASection";
import ContactUsPage from "pages/Pages/ContactUsPage/ContactUsPage";

const Home = () => {
  return (
    <section className="Home">
      {/* 🚀 HERO */}
      <HeroSection />

      {/* ⭐ FEATURES (ID REQUIRED FOR NAV SCROLL) */}
      <section id="features">
        <FeaturesSection />
      </section>

      {/* 💰 PRICING */}
      <section id="pricing">
        <PricingSection />
      </section>

      {/* ❓ FAQ */}
      <section id="faq">
        <FAQPage />
      </section>

      {/* 💬 TESTIMONIALS */}
      <section id="testimonials">
        <TestimonialsPage />
      </section>

      {/* 🔥 CTA */}
      <CTASection />

      {/* 📞 CONTACT */}
      <section id="contact">
        <ContactUsPage />
      </section>
    </section>
  );
};

export default Home;