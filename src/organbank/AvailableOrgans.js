import React, { useEffect, useState, useCallback } from "react";
import {
  listAvailability,
  addAvailability,
  updateAvailability,
  deleteAvailability,
} from "../services/availabilityService"; // ✅ correct import
import Toast from "../shared/Toast";

const AvailableOrgans = () => {
  const [availabilities, setAvailabilities] = useState([]);
  const [form, setForm] = useState({
    id: null,
    organType: "",
    bloodType: "",
    available: false,
  });
  const [toast, setToast] = useState({ show: false, message: "", type: "" });

  const showToast = (message, type) => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "" }), 3000);
  };

  // ✅ Wrapped in useCallback to fix ESLint warning
  const loadAvailabilities = useCallback(async () => {
    try {
      const data = await listAvailability();
      setAvailabilities(data);
    } catch (err) {
      showToast("Failed to load organ availabilities", "error");
    }
  }, []);

  useEffect(() => {
    loadAvailabilities();
  }, [loadAvailabilities]); // ✅ no warning

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (form.id) {
        await updateAvailability(form.id, form);
        showToast("Availability updated successfully!", "success");
      } else {
        await addAvailability(form);
        showToast("Availability added successfully!", "success");
      }
      setForm({ id: null, organType: "", bloodType: "", available: false });
      loadAvailabilities();
    } catch (err) {
      showToast("Error saving availability", "error");
    }
  };

  const handleEdit = (item) => {
    setForm(item);
  };

  const handleDelete = async (id) => {
    try {
      await deleteAvailability(id);
      showToast("Availability deleted successfully!", "success");
      loadAvailabilities();
    } catch (err) {
      showToast("Error deleting availability", "error");
    }
  };

  return (
    <div className="container">
      <h2>Available Organs</h2>
      <table className="table">
        <thead>
          <tr>
            <th>Organ Type</th>
            <th>Blood Type</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {availabilities.map((item) => (
            <tr key={item.id}>
              <td>{item.organType}</td>
              <td>{item.bloodType}</td>
              <td>{item.available ? "Yes" : "No"}</td>
              <td>
                <button onClick={() => handleDelete(item.id)} className="btn">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toast.show && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
};

export default AvailableOrgans;
