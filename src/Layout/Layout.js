import React from "react";
import Header from "./header/Header";
import Footer from "./footer/Footer";
import MobileFooter from "./footer/MobileFooter";

function Layout({ children }) {
  return (
    <>
      <div className="bg-main text-white">
        <Header />
        {children}
        <Footer />
        {/* mobile footer*/} 
        <MobileFooter/>
      </div>
    </>
  );
}

export default Layout;
