// src/utils/axiosInstance.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Add interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("ods_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
