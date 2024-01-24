"use client";
import React from "react";
import dynamic from "next/dynamic";
const Navbar = dynamic(() => import("../../home/navbar"));
const Footer = dynamic(() => import("../../footer/Footer"));
import { AppProgressBar as ProgressBar } from "next-nprogress-bar";

const Layout = ({ children }) => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <div>
        <main>{children}</main>
        <ProgressBar
          height="4px"
          color="#FF2800"
          options={{ showSpinner: false }}
          shallowRouting
        />
      </div>
      <footer>
        <Footer />
      </footer>
    </>
  );
};

export default Layout;
