// src/hospital/HospitalDashboard.js
import React, { useEffect, useState } from "react";
import axios from "../utils/axiosInstance";
import { useAuth } from "../auth/useAuth";

export default function HospitalDashboard() {
  const { user } = useAuth(); // logged-in user contains id & token
  const [hospital, setHospital] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    contactNumber: "",
  });

  // Fetch hospital details by user ID
  useEffect(() => {
    if (!user?.id || !user?.token) return;

    const fetchHospital = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/hospitals/user/${user.id}`,
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        setHospital(res.data);
      } catch (err) {
        console.error("Error fetching hospital:", err);
      }
    };

    fetchHospital();
  }, [user]);

  // Handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle Save (update hospital via DTO)
  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/hospitals/${hospital.id}`,
        formData, // sending only editable fields
        {
          headers: { Authorization: `Bearer ${user.token}` },
        }
      );
      setHospital(response.data); // update frontend state immediately
      setEditMode(false);
    } catch (err) {
      console.error("Error updating hospital:", err);
      alert("Failed to update hospital. Please try again.");
    }
  };

  // Enter edit mode with current hospital data
  const handleEdit = () => {
    setFormData({
      name: hospital.name,
      address: hospital.address,
      contactNumber: hospital.contactNumber,
    });
    setEditMode(true);
  };

  if (!hospital) return <p>Loading...</p>;

  return (
  <div className="card">
    <h2 className="card-title">Hospital Dashboard</h2>

    {editMode ? (
      <div className="form-group">
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="input"
          placeholder="Hospital Name"
        />
        <input
          name="address"
          value={formData.address}
          onChange={handleChange}
          className="input"
          placeholder="Address"
        />
        <input
          name="contactNumber"
          value={formData.contactNumber}
          onChange={handleChange}
          className="input"
          placeholder="Contact Number"
        />
        <div className="flex gap-2">
          <button onClick={handleSave} className="btn btn-primary">
            Save
          </button>
          <button
            onClick={() => setEditMode(false)}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <div className="info">
        <p>
          <strong>Name:</strong> {hospital.name}
        </p>
        <p>
          <strong>Address:</strong> {hospital.address}
        </p>
        <p>
          <strong>Contact:</strong> {hospital.contactNumber}
        </p>
        <button onClick={handleEdit} className="btn btn-success">
          Edit
        </button>
      </div>
    )}
  </div>
);

}
