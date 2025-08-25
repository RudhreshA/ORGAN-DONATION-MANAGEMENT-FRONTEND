// Layout.js
import React, { useState } from "react";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";

export default function Layout({ children }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleOverlayClick = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="app">
      <Navbar onMenuToggle={handleMenuToggle} />
      <div className="main">
        <Sidebar isMobileOpen={isMobileMenuOpen} setIsMobileOpen={setIsMobileMenuOpen} />
        <div className="content">{children}</div>
      </div>
      <Footer />
      <div 
        className={`mobile-overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={handleOverlayClick}
      />
    </div>
  );
}
