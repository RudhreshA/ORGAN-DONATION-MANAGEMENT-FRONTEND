import React, { useState } from "react";
import { addAvailability } from "../services/availabilityService";
import Toast from "../shared/Toast";

const ORGAN_TYPES = ["Kidney", "Liver", "Heart", "Lung"];
const BLOOD_TYPE_REGEX = /^(A|B|AB|O)[+-]$/i;

export default function AddOrganForm() {
  const [organType, setOrganType] = useState("Kidney");
  const [bloodType, setBloodType] = useState("O+");
  const [available, setAvailable] = useState(true);
  const [toast, setToast] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = () => {
    const e = {};
    if (!organType) e.organType = "Please select an organ type.";
    if (!bloodType.trim()) e.bloodType = "Blood type is required.";
    else if (!BLOOD_TYPE_REGEX.test(bloodType.trim()))
      e.bloodType = "Use a valid blood type (A+, A-, B+, B-, AB+, AB-, O+, O-).";
    return e;
    };

  const submit = async (ev) => {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length) return;

    setSubmitting(true);
    try {
      await addAvailability({ organType, bloodType: bloodType.toUpperCase(), available });
      setToast({ type: "success", message: "Availability added successfully" });
      // Optional: reset form
      // setOrganType("Kidney"); setBloodType("O+"); setAvailable(true);
    } catch (err) {
      const apiMsg =
        err?.response?.data?.message ||
        err?.message ||
        "Something went wrong while adding availability";
      setToast({ type: "error", message: apiMsg });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="form" onSubmit={submit} style={{ maxWidth: 480 }}>
      <h3>Add Availability</h3>

      <div>
        <label className="label">Organ Type</label>
        <select
          value={organType}
          onChange={(e) => setOrganType(e.target.value)}
          className="select"
        >
          {ORGAN_TYPES.map((t) => (
            <option key={t} value={t} className="option">
              {t}
            </option>
          ))}
        </select>
        {errors.organType && <small className="error">{errors.organType}</small>}
      </div>

      <div>
        <label className="label">Blood Type</label>
        <input
          className="input"
          value={bloodType}
          onChange={(e) => setBloodType(e.target.value)}
          placeholder="e.g., O+"
        />
        {errors.bloodType && <small className="error">{errors.bloodType}</small>}
      </div>

      <div>
        <label className="label">Available</label>
        <select
          value={available ? "yes" : "no"}
          onChange={(e) => setAvailable(e.target.value === "yes")}
          className="select"
        >
          <option value="yes" className="option">Yes</option>
          <option value="no" className="option">No</option>
        </select>
      </div>

      <button className="btn primary" type="submit" disabled={submitting}>
        {submitting ? "Saving..." : "Save"}
      </button>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </form>
  );
}
