import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../home/navbar"));
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
        
      </footer>
    </>
  );
};

export default Layout;
