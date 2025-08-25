import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import authService from "../services/authService";
import Toast from "../shared/Toast";

const baseForm = {
  name: "", email: "", password: "", role: "DONOR",
  age: "", bloodGroup: "", organList: "", medicalInfo: "",
  hospitalName: "", address: "", contactNumber: "",
  organBankName: ""
};

export default function Register() {
  const [form, setForm] = useState(baseForm);
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const set = (k, v) => setForm(s => ({ ...s, [k]: v }));

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { ...form };
      if (payload.age === "") delete payload.age;

      await authService.register(payload);

      setToast({ type: "success", message: "Registered successfully. Please login." });
      setTimeout(() => navigate("/login"), 800);
    } catch (err) {
      const msgObj = err?.response?.data;
      let message = "Registration failed";

      if (msgObj) {
        message = msgObj.message || JSON.stringify(msgObj);
      }

      setToast({ type: "error", message });
    }
  };

  const role = form.role;

  return (
  <div className="card" style={{ maxWidth: 720, margin: "40px auto" }}>
    <h2>Register</h2>
    <form onSubmit={onSubmit} className="form grid">
      <div>
        <label className="label">Name</label>
        <input className="input" value={form.name} onChange={e => set("name", e.target.value)} required />
      </div>
      <div>
        <label className="label">Email</label>
        <input className="input" type="email" value={form.email} onChange={e => set("email", e.target.value)} required />
      </div>
      <div>
        <label className="label">Password</label>
        <input className="input" type="password" value={form.password} onChange={e => set("password", e.target.value)} required />
      </div>
      <div>
        <label className="label">Role</label>
        <select className="select" value={form.role} onChange={e => set("role", e.target.value)}>
          <option className="option">DONOR</option>
          <option className="option">HOSPITAL_STAFF</option>
          <option className="option">ORGAN_BANK_STAFF</option>
        </select>
      </div>

      {/* Role-specific fields */}
      {role === "DONOR" && (
        <>
          <div>
            <label className="label">Age</label>
            <input className="input" type="number" min="18" value={form.age} onChange={e => set("age", e.target.value)} />
          </div>
          <div>
            <label className="label">Blood Group</label>
            <input className="input" placeholder="A+, O-, AB+" value={form.bloodGroup} onChange={e => set("bloodGroup", e.target.value)} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            <label className="label">Organs (comma separated)</label>
            <input className="input" value={form.organList} onChange={e => set("organList", e.target.value)} />
          </div>
          <div className="grid" style={{ gridTemplateColumns: "1fr" }}>
            <label className="label">Medical Info</label>
            <textarea className="input" rows="3" value={form.medicalInfo} onChange={e => set("medicalInfo", e.target.value)} />
          </div>
        </>
      )}

      {role === "HOSPITAL_STAFF" && (
        <>
          <div>
            <label className="label">Hospital Name</label>
            <input className="input" value={form.hospitalName} onChange={e => set("hospitalName", e.target.value)} />
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input" value={form.address} onChange={e => set("address", e.target.value)} />
          </div>
          <div>
            <label className="label">Contact Number</label>
            <input className="input" value={form.contactNumber} onChange={e => set("contactNumber", e.target.value)} />
          </div>
        </>
      )}

      {role === "ORGAN_BANK_STAFF" && (
        <>
          <div>
            <label className="label">Organ Bank Name</label>
            <input className="input" value={form.organBankName} onChange={e => set("organBankName", e.target.value)} />
          </div>
          <div>
            <label className="label">Address</label>
            <input className="input" value={form.address} onChange={e => set("address", e.target.value)} />
          </div>
          <div>
            <label className="label">Contact Number</label>
            <input className="input" value={form.contactNumber} onChange={e => set("contactNumber", e.target.value)} />
          </div>
        </>
      )}

      <div style={{ gridColumn: "1 / -1", display: "flex", gap: 8 }}>
        <button className="btn" type="button" onClick={() => setForm(baseForm)}>Reset</button>
        <button className="btn" type="submit">Register</button>
      </div>
    </form>

    <div style={{ marginTop: 10 }} className="small">
      Already have an account? <Link to="/login">Login</Link>
    </div>

    {toast && <Toast {...toast} onClose={() => setToast(null)} />}
  </div>
);

}
