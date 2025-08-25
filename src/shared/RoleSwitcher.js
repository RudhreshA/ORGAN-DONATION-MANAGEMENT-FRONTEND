import React from "react";
import { useAuth } from "../auth/useAuth";

export default function RoleSwitcher() {
  const { user } = useAuth();
  if (!user) return null;
  return <div className="badge">Active Role: {user.role}</div>;
}
