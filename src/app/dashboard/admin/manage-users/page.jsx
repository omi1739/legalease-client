"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function ManageUsers() {
  const { data: session } = useSession();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingEmail, setUpdatingEmail] = useState(null);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      const res = await fetch("http://localhost:5000/admin/users", {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!res.ok) {
        throw new Error("Failed to load users list.");
      }
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      setError(err.message || "An error occurred while loading users.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === "admin") {
      fetchUsers();
    }
  }, [session]);

  const handleChangeRole = async (email, newRole) => {
    setUpdatingEmail(email);
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      const res = await fetch(`http://localhost:5000/admin/users/${email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ role: newRole })
      });
      if (res.ok) {
        setUsers((prev) =>
          prev.map((user) => (user.email === email ? { ...user, role: newRole } : user))
        );
      } else {
        alert("Failed to update user role.");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingEmail(null);
    }
  };

  const handleDeleteUser = async (id) => {
    if (!confirm("Are you sure you want to delete this user?")) return;
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      const res = await fetch(`http://localhost:5000/admin/users/${id}`, {
        method: "DELETE",
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (res.ok) {
        setUsers((prev) => prev.filter((user) => user.id !== id));
      } else {
        alert("Failed to delete user.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-1/3 bg-white/5 rounded-full" />
        <div className="h-64 bg-white/5 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Manage Users</h2>
        <p className="mt-1 text-sm text-slate-400">View LegalEase users, change roles, and administrative options.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {users.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-12 text-center text-slate-500">
          No users registered in the system.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Name</th>
                <th className="px-6 py-4">Email</th>
                <th className="px-6 py-4">Role</th>
                <th className="px-6 py-4">Change Role</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-200">
              {users.map((row) => (
                <tr key={row.id || row._id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-white">{row.name}</td>
                  <td className="px-6 py-4 text-slate-400">{row.email}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex rounded-full bg-white/5 border border-white/10 px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider text-slate-300">
                      {row.role}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <select
                      value={row.role || "user"}
                      disabled={updatingEmail === row.email}
                      onChange={(e) => handleChangeRole(row.email, e.target.value)}
                      className="rounded-xl border border-white/10 bg-slate-950 px-3 py-1.5 text-xs text-slate-300 focus:outline-none cursor-pointer"
                    >
                      <option value="user" className="bg-slate-950">Client (User)</option>
                      <option value="lawyer" className="bg-slate-950">Lawyer</option>
                      <option value="admin" className="bg-slate-950">Admin</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleDeleteUser(row.id || row._id)}
                      className="rounded-full bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 px-3 py-1 text-xs font-bold transition cursor-pointer"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
