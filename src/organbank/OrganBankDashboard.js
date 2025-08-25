import React, { useEffect, useState } from "react";
import { listAvailability } from "../services/availabilityService";
import { fetchRequests } from "../services/requestService";

export default function OrganBankDashboard() {
  const [availability, setAvailability] = useState([]);
  const [requests, setRequests] = useState([]);

  useEffect(()=>{
    listAvailability().then(setAvailability).catch(()=>{});
    fetchRequests().then(setRequests).catch(()=>{});
  },[]);

  return (
    <div className="grid grid-2">
      <div className="card">
        <h3>Availability</h3>
        <table className="table">
          <thead><tr><th>ID</th><th>Organ</th><th>Blood</th><th>Available</th></tr></thead>
          <tbody>
            {availability.map(a=>(<tr key={a.id}><td>{a.id}</td><td>{a.organType}</td><td>{a.bloodType}</td><td>{a.available ? "Yes":"No"}</td></tr>))}
          </tbody>
        </table>
      </div>
      <div className="card">
        <h3>Incoming Requests</h3>
        <ul>{requests.map(r=>(<li key={r.id} className="li">#{r.id} {r.organType} • {r.status}</li>))}</ul>
      </div>
    </div>
  );
}
