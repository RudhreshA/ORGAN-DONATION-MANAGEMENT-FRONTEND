// src/hospital/OrganRequestForm.js
import React, { useState, useEffect } from "react";
import { useAuth } from "../auth/useAuth";

export default function OrganRequestForm({ onCreated }) {
  const { user } = useAuth(); // contains token + userId
  const [organType, setOrganType] = useState("");
  const [error, setError] = useState("");
  const [hospitalId, setHospitalId] = useState(null);

  // fetch hospital id using user id
  useEffect(() => {
    const fetchHospitalId = async () => {
      try {
        const res = await fetch(
          `http://localhost:8080/api/hospitals/user/${user.id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch hospital details");
        const data = await res.json();
        setHospitalId(data.id); // assuming DTO returns hospital id
      } catch (err) {
        setError(err.message);
      }
    };
    if (user?.id) fetchHospitalId();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!organType) return setError("Please enter an organ type");
    if (!hospitalId) return setError("Hospital ID not loaded yet");

    try {
      const res = await fetch("http://localhost:8080/api/organ-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          organType,
          hospitalId, // ✅ correct hospitalId
        }),
      });

      if (!res.ok) throw new Error("Failed to create request");
      const data = await res.json();

      onCreated && onCreated(data);
      setOrganType("");
      setError("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <input
        value={organType}
        onChange={(e) => setOrganType(e.target.value)}
        placeholder="Organ Type"
        className="input"
      />
      <button type="submit" className="btn">
        Request
      </button>
      {error && <p className="text-red-500">{error}</p>}
    </form>
  );
}
