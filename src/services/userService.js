import api from "../utils/axiosInstance";
export const listUsers = () => api.get("/api/users").then(r=>r.data);
export const getUser = (id) => api.get(`/api/users/${id}`).then(r=>r.data);
export const updateUser = (id, body) => api.put(`/api/users/${id}`, body).then(r=>r.data);
export const softDeleteUser = (id) => api.delete(`/api/users/${id}`).then(r=>r.data);
