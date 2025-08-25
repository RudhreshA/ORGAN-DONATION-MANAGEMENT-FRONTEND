import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/useAuth";
import { getDonor, getDocuments, getConsent, updateConsent } from "../services/donorService";

export default function DonorDashboard() {
  const { user } = useAuth();
  const [donor, setDonor] = useState(null);
  const [docs, setDocs] = useState([]);
  const [consent, setConsent] = useState("");

  useEffect(() => {
  if (!user) return;

  getDonor(user.id)
    .then(d => {
      setDonor(d);

      getDocuments(d.id).then(setDocs).catch(() => {});
      getConsent(d.id).then(setConsent).catch(()=>{});
    })
    .catch(() => {});
}, [user]);

const toggleConsent = async () => {
  if (!donor) return;  // donor must be loaded first
  const newStatus = consent === "GIVEN" ? "WITHDRAWN" : "GIVEN";
  const updated = await updateConsent(donor.id, newStatus);
  setConsent(updated.consentStatus || newStatus);
};

  return (
  <div className="grid grid-3">
    <div className="card">
      <h3>Welcome, {donor?.name || "Donor"}</h3>
      <div className="label">Blood Group: {donor?.bloodGroup || "-"}</div>
      <div className="label">Organs: {donor?.organList || "-"}</div>
      <hr />
      <div className="badge">Consent: {consent || donor?.consentStatus || "PENDING"}</div>
      <button className="btn" onClick={toggleConsent} style={{ marginTop: 8 }}>
        Toggle Consent
      </button>
    </div>

    <div className="card">
      <h3>Your Documents</h3>
      <ul>
        {docs?.map((d) => (
          <li key={d.id} className="li">
            {d.fileName} • {d.fileType}
          </li>
        ))}
      </ul>
    </div>

    <div className="card">
      <h3>Quick Links</h3>
      <div className="small">
        Update profile, upload documents, and manage your consent.
      </div>
    </div>
  </div>
);


}
