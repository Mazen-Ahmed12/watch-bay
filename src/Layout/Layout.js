import React from "react";
import NavBar from "./Navbar/NavBar";
import Footer from "./footer/Footer";
import MobileFooter from "./footer/MobileFooter";

function Layout({ children }) {
  return (
    <>
      <div className="bg-main text-white">
        <NavBar />
        {children}
        <Footer />
        {/* mobile footer*/} 
        <MobileFooter/>
      </div>
    </>
  );
}

export default Layout;
