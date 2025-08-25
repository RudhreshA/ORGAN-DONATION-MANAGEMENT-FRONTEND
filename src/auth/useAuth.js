// src/auth/useAuth.js
import React, { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const raw = localStorage.getItem("ods_user");
    return raw ? JSON.parse(raw) : null;
  });

  useEffect(() => {
    if (user) localStorage.setItem("ods_user", JSON.stringify(user));
    else localStorage.removeItem("ods_user");
  }, [user]);

  const login = (data) => {
  setUser({ 
  id: data.userId,
  role: data.role,
  token: data.token 
});

};


  const logout = () => {
    localStorage.removeItem("ods_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
