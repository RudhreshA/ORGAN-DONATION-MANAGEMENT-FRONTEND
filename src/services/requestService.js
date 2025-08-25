import api from "../utils/axiosInstance";

export const createOrganRequest = (body) =>
    api.post("/api/organ-requests", body).then(r => r.data);

export const fetchRequests = () => api.get("/api/organ-requests").then(r => r.data);

export const fetchRequestsByHospital = (hospitalId) =>
    api.get(`/api/organ-requests/hospital/${hospitalId}`).then(r => r.data);

export const updateRequest = (id, body) => api.put(`/api/organ-requests/${id}`, body).then(r => r.data);

export const updateRequestStatus = (id, status) =>
    api.patch(`/api/organ-requests/${id}/status`, { status }).then(r => r.data);
