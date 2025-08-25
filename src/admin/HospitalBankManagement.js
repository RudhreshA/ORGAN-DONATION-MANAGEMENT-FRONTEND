import React, { useEffect, useState } from "react";
import axios from "axios";

export default function HospitalBankManagement() {
  const [hospitals, setHospitals] = useState([]);
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState(null);

  // Load Hospitals
  const loadHospitals = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/hospitals", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`, // ✅ add token
        },
      });
      setHospitals(res.data);
    } catch (err) {
      setError("Failed to load hospitals");
    }
  };

  // Load Organ Banks
  const loadBanks = async () => {
  try {
    const res = await axios.get("http://localhost:8080/api/organ-banks", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setBanks(res.data);
  } catch (err) {
    console.error("Bank API error:", err.response?.data || err.message);
    setError("Failed to load banks");
  }
};

  useEffect(() => {
    loadHospitals();
    loadBanks();
  }, []);

  return (
    <div className="card">
      <h3>Hospital & Bank Management</h3>
      {error && <div className="badge danger">{error}</div>}

      <h4>Hospitals</h4>
      <ul className="list">
        {hospitals.map((h) => (
          <li key={h.id} className="small">
            {h.name} — {h.address}
          </li>
        ))}
      </ul>

      <h4>Organ Banks</h4>
      <ul className="list">
        {banks.map((b) => (
          <li key={b.id} className="small">
            {b.name} — {b.location}
          </li>
        ))}
      </ul>
    </div>
  );
}
