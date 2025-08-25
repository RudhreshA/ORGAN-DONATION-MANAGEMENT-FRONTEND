import axios from "axios";

const API_URL = "http://localhost:8080/api/hospitals"; // adjust if needed

export const getHospitals = () => axios.get(API_URL);
export const getHospitalById = (id) => axios.get(`${API_URL}/${id}`);
export const createHospital = (hospital) => axios.post(API_URL, hospital);
export const updateHospital = (id, hospital) => axios.put(`${API_URL}/${id}`, hospital);
export const deleteHospital = (id) => axios.delete(`${API_URL}/${id}`);
