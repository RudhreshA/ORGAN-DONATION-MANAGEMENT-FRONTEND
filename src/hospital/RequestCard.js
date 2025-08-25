// src/hospital/RequestCard.js
import React from "react";

export default function RequestCard({ request }) {
  return (
    <div className="border rounded-lg p-4 shadow-md bg-white mb-2">
      <p><strong>Organ:</strong> {request.organType}</p>
      <p><strong>Status:</strong> {request.status}</p>
      {request.organBankId && (
        <p><strong>Organ Bank ID:</strong> {request.organBankId}</p>
      )}
    </div>
  );
}
