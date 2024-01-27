import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../home/navbar"));
const Footer = dynamic(() => import("../../footer/Footer"));
const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <main>{children}</main>
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
