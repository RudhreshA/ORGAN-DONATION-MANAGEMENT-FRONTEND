import api from "../utils/axiosInstance";

export const getDonorByUserId = (userId) =>
  api.get(`/api/donors/by-user/${userId}`).then(r => r.data);

// Keep old name to avoid breaking imports
export const getDonor = getDonorByUserId;


export const updateDonor = (id, body) => api.put(`/api/donors/${id}`, body).then(r => r.data);
export const getConsent = (id) => api.get(`/api/donors/${id}/consent`).then(r => r.data);
export const updateConsent = (id, status) => api.put(`/api/donors/${id}/consent?status=${encodeURIComponent(status)}`).then(r => r.data);
export const uploadDocument = (id, body) => api.post(`/api/donors/${id}/documents`, body).then(r => r.data);
export const getDocuments = (id) => api.get(`/api/donors/${id}/documents`).then(r => r.data);
