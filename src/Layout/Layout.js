import React from "react";
import NavBar from "./Navbar/NavBar";
import Footer from "./footer/Footer";

function Layout({ children }) {
  return (
    <>
      <div className="bg-main text-white">
        <NavBar />
        {children}
        <Footer />
      </div>
    </>
  );
}

export default Layout;
