import React, { useEffect, useState } from "react";
import axios from "axios";

const RequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔑 Read from "ods_user"
  const user = JSON.parse(localStorage.getItem("ods_user"));
  const hospitalId = user?.id;
  const token = user?.token;

  useEffect(() => {
    const fetchRequests = async () => {
      if (!token || !hospitalId) {
        console.error("No user or token found. Please log in.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8080/api/organ-requests/hospital/${hospitalId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [hospitalId, token]);

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="request-list">
      <h2>My Organ Requests</h2>
      {requests.length === 0 ? (
        <p>No requests found.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Organ Type</th>
              <th>Status</th>
              <th>Hospital ID</th>
              <th>Organ Bank ID</th>
            </tr>
          </thead>
          <tbody>
            {requests.map((req) => (
              <tr key={req.id}>
                <td>{req.id}</td>
                <td>{req.organType}</td>
                <td>{req.status}</td>
                <td>{req.hospitalId}</td>
                <td>{req.organBankId || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default RequestList;
