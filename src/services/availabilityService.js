import api from "../utils/axiosInstance";
export const listAvailability = () => api.get("/api/organ-availability").then(r=>r.data);
export const addAvailability = (body) => api.post("/api/organ-availability", body).then(r=>r.data);
export const updateAvailability = (id, body) => api.put(`/api/organ-availability/${id}`, body).then(r=>r.data);
export const deleteAvailability = (id) => api.delete(`/api/organ-availability/${id}`).then(r=>r.data);
