import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../auth/useAuth";

export default function Navbar({ onMenuToggle }) {
  const { user, logout } = useAuth();
  return (
    <div className="nav">
      <div style={{ display:"flex", gap:12, alignItems:"center"}}>
        <button className="mobile-menu-toggle" onClick={onMenuToggle}>
          ☰
        </button>
        <Link to="/" className="badge">🫀 Organ Donation System</Link>
      </div>
      <div style={{ display:"flex", gap:12, alignItems:"center"}}>
        {user ? (<>
          <span className="badge">Role: {user.role}</span>
          <button className="btn" onClick={logout}>Logout</button>
        </>) : (
          <Link to="/login" className="btn">Login</Link>
        )}
      </div>
    </div>
  );
}
