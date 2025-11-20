import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("./navbar"), { ssr: false });
const Footer = dynamic(() => import("../footer/Footer"));

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div className="flex flex-col min-h-screen">
        <main className="flex-grow">{children}</main>
        <Footer />
      </div>
    </>
  );
};

export default Layout;
