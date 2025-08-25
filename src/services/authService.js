import api from "../utils/axiosInstance";

const login = async (payload) => {
  const { data } = await api.post("/api/auth/login", payload);
  localStorage.setItem("ods_token", data.token); // save JWT
  return {
    token: data.token,
    userId: data.userId,
    role: data.role
  };
};

const register = async (payload) => {
  // Updated endpoint to match backend
  const { data } = await api.post("/api/users/register", payload);
  return data;
};

const logout = () => {
  localStorage.removeItem("ods_token");
  return true;
};

// ✅ Export as object
const authService = { login, register, logout };
export default authService;
