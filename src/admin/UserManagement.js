import React, { useEffect, useState } from "react";
import { listUsers, softDeleteUser } from "../services/userService";
import Toast from "../shared/Toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState(null);

  const load = async () => {
    try {
      const data = await listUsers();
      setUsers(data);
    } catch (e) {
      console.error("Failed to load users", e);
    }
  };

  useEffect(() => {
    load(); // ✅ safe, not returning a promise
  }, []);

  const remove = async (id) => {
    try {
      await softDeleteUser(id);
      setToast({ type: "success", message: "Deleted" });
      load();
    } catch (e) {
      setToast({ type: "error", message: "Failed" });
    }
  };

  return (
    <div className="card">
      <h3>Users</h3>
      <table className="table">
        <thead>
          <tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th></th></tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.name}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button className="btn danger" onClick={() => remove(u.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {toast && <Toast {...toast} onClose={() => setToast(null)} />}
    </div>
  );
}
