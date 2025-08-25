import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Sidebar({ isMobileOpen, setIsMobileOpen }) {
  const { user } = useAuth();
  const role = user?.role;

  const items = [];
  if (role === "DONOR") {
    items.push(
      ["Dashboard","/donor/dashboard"],
      ["Profile","/donor/profile"],
      ["Documents","/donor/documents"],
    );
  }
  if (role === "HOSPITAL_STAFF") {
    items.push(
      ["Dashboard","/hospital/dashboard"],
      ["New Request","/hospital/request"],
      ["Request List", "/hospital/request-list"]
    );
  }
  if (role === "ORGAN_BANK_STAFF") {
    items.push(
      ["Dashboard","/organbank/dashboard"],
      ["Availability","/organbank/availability"],
      ["Add Organ","/organbank/add-organ"],
      ["Requests","/organbank/requests"]
    );
  }
  if (role === "ADMIN") {
    items.push(
      ["Dashboard","/admin/dashboard"],
      ["Users","/admin/users"],
      ["Hospitals & Banks","/admin/hospitals-banks"],
      ["Reports","/admin/reports"]
    );
  }

  return (
    <div className={`sidebar-card ${isMobileOpen ? 'mobile-open' : ''}`}>
      <h3>Navigation</h3>
      <div className="sidebar-links">
        {items.map(([label, href]) => (
          <Link 
            key={href} 
            className="btn" 
            to={href}
            onClick={() => isMobileOpen && setIsMobileOpen(false)}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}
