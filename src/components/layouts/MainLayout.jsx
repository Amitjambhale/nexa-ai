import React from "react";
import Header from "components/header/Normal/Header";
import Footer from "components/footer/Footer";
import { Outlet } from "react-router-dom";
import WhatsAppWidget from "components/WhatsAppWidget/WhatsAppWidget";

const MainLayout = () => {
  return (
    <>
      <Header className="fixed-header" />
      <div className="main-content">
        <Outlet />
      </div>
            <WhatsAppWidget/>
      <Footer className="fixed-footer" />
    </>
  );
};

export default MainLayout;
