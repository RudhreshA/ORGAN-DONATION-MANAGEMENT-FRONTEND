import api from "../utils/axiosInstance";
export const uploadDocument = (body) => api.post("/api/documents", body).then(r=>r.data);
export const updateDocument = (id, body) => api.put(`/api/documents/${id}`, body).then(r=>r.data);
export const getDocument = (id) => api.get(`/api/documents/${id}`).then(r=>r.data);
export const listDocuments = () => api.get("/api/documents").then(r=>r.data);
export const deleteDocument = (id) => api.delete(`/api/documents/${id}`).then(r=>r.data);
