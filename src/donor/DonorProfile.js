import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { getDonor, updateDonor } from "../services/donorService";
import Toast from "../shared/Toast";

export default function DonorProfile() {
  const { user } = useAuth();
  const [donor, setDonor] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    if (!user) return;

    // Fetch donor by user ID using the new endpoint
    getDonor(user.id)
      .then((data) => setDonor(data))
      .catch(() =>
        setToast({ type: "error", message: "Failed to fetch donor info" })
      );
  }, [user]);

  const save = async (e) => {
  e.preventDefault();
  try {
    const payload = {
      name: donor.name,
      age: donor.age,
      bloodGroup: donor.bloodGroup,
      organList: donor.organList,
      consentStatus: donor.consentStatus,
      medicalInfo: donor.medicalInfo
    };
    const updated = await updateDonor(donor.id, payload);
    setDonor(updated);
    setToast({ type: "success", message: "Profile updated" });
    setEditMode(false);
  } catch (e) {
    setToast({ type: "error", message: "Failed to update profile" });
  }
};


  if (!donor) return <div className="card">Loading profile…</div>;

  // Read-only view
  if (!editMode) {
    return (
      <div className="card grid grid-2 gap-4">
        <div><strong>Name:</strong> {donor.name || "-"}</div>
        <div><strong>Age:</strong> {donor.age || "-"}</div>
        <div><strong>Blood Group:</strong> {donor.bloodGroup || "-"}</div>
        <div><strong>Organs:</strong> {donor.organList || "-"}</div>
        <div style={{ gridColumn: "1 / -1" }}>
          <strong>Medical Info:</strong> {donor.medicalInfo || "-"}
        </div>
        <div style={{ gridColumn: "1 / -1" }}>
          <button className="btn primary" onClick={() => setEditMode(true)}>
            Edit
          </button>
        </div>
        {toast && <Toast {...toast} onClose={() => setToast(null)} />}
      </div>
    );
  }

  // Edit view
  return (
    <form className="card grid grid-2 gap-4" onSubmit={save}>
      <div>
        <label>Name</label>
        <input
          className="input"
          value={donor.name || ""}
          onChange={(e) => setDonor({ ...donor, name: e.target.value })}
        />
      </div>
      <div>
        <label>Age</label>
        <input
          className="input"
          type="number"
          value={donor.age || ""}
          onChange={(e) => setDonor({ ...donor, age: Number(e.target.value) })}
        />
      </div>
      <div>
        <label>Blood Group</label>
        <input
          className="input"
          value={donor.bloodGroup || ""}
          onChange={(e) => setDonor({ ...donor, bloodGroup: e.target.value })}
        />
      </div>
      <div>
        <label>Organs (comma)</label>
        <input
          className="input"
          value={donor.organList || ""}
          onChange={(e) => setDonor({ ...donor, organList: e.target.value })}
        />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <label>Medical Info</label>
        <textarea
          rows="3"
          value={donor.medicalInfo || ""}
          onChange={(e) =>
            setDonor({ ...donor, medicalInfo: e.target.value })
          }
        />
      </div>
      <div style={{ gridColumn: "1 / -1" }}>
        <button className="btn primary" type="submit">Save</button>
        <button
          type="button"
          className="btn secondary"
          onClick={() => setEditMode(false)}
          style={{ marginLeft: "10px" }}
        >
          Cancel
        </button>
      </div>
      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </form>
  );
}
