// Home.jsx
import React, { useState } from "react";

import "./Home.scss";
import Hero from "pages/Sections/Hero/Hero";
import AboutSection from "pages/Sections/AboutSection/AboutSection";
import AchievementSection from "pages/Sections/AchievementSection/AchievementSection";
import LifeInsuranceSection from "pages/Sections/LifeInsuranceSection/LifeInsuranceSection";
import OurStrengthSection from "pages/Sections/OurStrengthSection/OurStrengthSection";
import GallerySection from "pages/Sections/GallerySection/GallerySection";
import TestimonialSection from "pages/Sections/TestimonialSection/TestimonialSection";
import BlogSection from "pages/Sections/BlogSection/BlogSection";
import NewsSection from "pages/Sections/NewsSection/NewsSection";

const Home = () => {
  return (
    <section className="Home">
      <>
        <Hero />
        <AboutSection />
        <AchievementSection/>
        <LifeInsuranceSection/>
        <OurStrengthSection/>
        <GallerySection/>
        {/* <NewsSection/> */}
        <TestimonialSection/>
        <BlogSection/>
      </>
    </section>
  );
};

export default Home;
