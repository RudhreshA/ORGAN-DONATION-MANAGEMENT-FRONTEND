import React, { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "./useAuth";
import authService from "../services/authService";
import Toast from "../shared/Toast";

const ROLES = ["DONOR", "HOSPITAL_STAFF", "ORGAN_BANK_STAFF", "ADMIN"];

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("DONOR");
  const [toast, setToast] = useState(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname;

 const onSubmit = async (e) => {
  e.preventDefault();
  try {
     const data = await authService.login({ email, password, role });
    console.log("Login response in frontend:", data);
    login(data);

    const routeMap = {
      DONOR: "/donor/dashboard",
      HOSPITAL_STAFF: "/hospital/dashboard",
      ORGAN_BANK_STAFF: "/organbank/dashboard",
      ADMIN: "/admin/dashboard"
    };
    navigate(from || routeMap[data.role] || "/");

  } catch (err) {
    const msg = err?.response?.data?.error || "Login failed";
    setToast({ type: "error", message: msg });
  }
};

  return (
    <div className="card" style={{ maxWidth: 520, margin: "40px auto" }}>
      <h2>Login</h2>
      <p className="small">Use your registered email & password. Role must match your account role.</p>
      <form onSubmit={onSubmit} className="grid" style={{ gap: 12 }}>
        <div>
          <label className="label">Email</label>
          <input className="input" type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
        </div>
        <div>
          <label className="label">Password</label>
          <input className="input" type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
        </div>
        <div>
          <label className="label">Role</label>
          <select value={role} onChange={(e)=>setRole(e.target.value)} className="select">
            {ROLES.map(r => <option key={r} value={r} className="option">{r}</option>)}
          </select>
        </div>
        <button className="btn primary" type="submit">Login</button>
      </form>
      <div style={{ marginTop: 10 }} className="small">
        New here? <Link to="/register">Register</Link>
      </div>
      {toast && <Toast {...toast} onClose={()=>setToast(null)} />}
    </div>
  );
}
