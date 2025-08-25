import React, { useEffect, useState, useCallback } from "react";
import { fetchRequests, updateRequest } from "../services/requestService";
import Toast from "../shared/Toast";

export default function RequestManager() {
  const [rows, setRows] = useState([]);
  const [toast, setToast] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');

  // Wrap loader in useCallback to satisfy react-hooks/exhaustive-deps
  const load = useCallback(() => {
    fetchRequests()
      .then(setRows)
      .catch(() =>
        setToast({ type: "error", message: "Failed to load requests" })
      );
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const setStatus = async (id, status) => {
    try {
      await updateRequest(id, { status });
      setToast({ type: "success", message: "Updated" });
      load();
    } catch (e) {
      setToast({ type: "error", message: "Failed to update" });
    }
  };

  // Sorting function
  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  // Sort and paginate data
  const sortedRows = [...rows].sort((a, b) => {
    const aValue = a[sortField] || '';
    const bValue = b[sortField] || '';
    
    if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
    if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // Pagination logic
  const totalPages = Math.ceil(sortedRows.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedRows = sortedRows.slice(startIndex, startIndex + itemsPerPage);

  const goToPage = (page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  };

  const SortIcon = ({ field }) => {
    if (sortField !== field) return null;
    return sortDirection === 'asc' ? ' ↑' : ' ↓';
  };

  return (
    <div className="card">
      <h3>Manage Requests</h3>
      <table className="table">
        <thead>
          <tr>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('id')}>
              ID<SortIcon field="id" />
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('organType')}>
              Organ<SortIcon field="organType" />
            </th>
            <th style={{ cursor: 'pointer' }} onClick={() => handleSort('status')}>
              Status<SortIcon field="status" />
            </th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedRows.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.organType}</td>
              <td>{r.status}</td>
              <td style={{ display: "flex", gap: 6 }}>
                <button className="btn" onClick={() => setStatus(r.id, "APPROVED")}>
                  Approve
                </button>
                <button
                  className="btn danger"
                  onClick={() => setStatus(r.id, "REJECTED")}
                >
                  Reject
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="pagination" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          gap: '8px', 
          marginTop: '16px',
          flexWrap: 'wrap'
        }}>
          <button 
            className="btn" 
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            style={{ padding: '6px 12px', minWidth: 'auto' }}
          >
            Previous
          </button>
          
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
            <button
              key={page}
              className={`btn ${currentPage === page ? 'active' : ''}`}
              onClick={() => goToPage(page)}
              style={{ 
                padding: '6px 12px', 
                minWidth: '40px',
                background: currentPage === page ? '#16a34a' : '#22c55e'
              }}
            >
              {page}
            </button>
          ))}
          
          <button 
            className="btn" 
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            style={{ padding: '6px 12px', minWidth: 'auto' }}
          >
            Next
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', marginTop: '8px', color: '#6b7280' }}>
        Showing {startIndex + 1}-{Math.min(startIndex + itemsPerPage, sortedRows.length)} of {sortedRows.length} requests
      </div>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
