import React, { useRef } from "react"; // useRef add kiya
import "./Home.scss";
import Hero from "pages/Sections/Hero/Hero";
import AboutSection from "pages/Sections/AboutSection/AboutSection";
import AchievementSection from "pages/Sections/AchievementSection/AchievementSection";
import LifeInsuranceSection from "pages/Sections/LifeInsuranceSection/LifeInsuranceSection";
import OurStrengthSection from "pages/Sections/OurStrengthSection/OurStrengthSection";
import GallerySection from "pages/Sections/GallerySection/GallerySection";
import TestimonialSection from "pages/Sections/TestimonialSection/TestimonialSection";
import BlogSection from "pages/Sections/BlogSection/BlogSection";

const Home = () => {
  // 1. Ref banaye life insurance section ke liye
  const lifeInsuranceRef = useRef(null);

  // 2. Scroll function jo hum Hero ko pass karenge
  const scrollToInsurance = () => {
    lifeInsuranceRef.current?.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  };

  return (
    <section className="Home">
      {/* 3. Hero ko function pass karein */}
      <Hero onExploreClick={scrollToInsurance} />
      
      <AboutSection />
      <AchievementSection/>
      
      {/* 4. Section ko wrap karein ya ref attach karein */}
      <div ref={lifeInsuranceRef}>
        <LifeInsuranceSection />
      </div>

      <OurStrengthSection/>
      <GallerySection/>
      <TestimonialSection/>
      <BlogSection/>
    </section>
  );
};

export default Home;