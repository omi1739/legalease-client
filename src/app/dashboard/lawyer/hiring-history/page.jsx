"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function LawyerHiringHistory() {
  const { data: session } = useSession();
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState(null);

  const fetchRequests = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    setError("");
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      const res = await fetch(`http://localhost:5000/hires/lawyer/${session.user.email}`, {
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!res.ok) {
        throw new Error("Failed to load hiring requests.");
      }
      const data = await res.json();
      setRequests(data);
    } catch (err) {
      setError(err.message || "An error occurred while loading requests.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchRequests();
    }
  }, [session]);

  const handleUpdateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      const res = await fetch(`http://localhost:5000/hires/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        setRequests((prev) =>
          prev.map((req) => (req._id === id ? { ...req, status } : req))
        );
      } else {
        alert("Failed to update status");
      }
    } catch (err) {
      console.error(err);
    } finally {
      setUpdatingId(null);
    }
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case "paid":
        return "bg-green-500/10 text-green-400 border border-green-500/20";
      case "accepted":
        return "bg-blue-500/10 text-blue-400 border border-blue-500/20";
      case "rejected":
        return "bg-red-500/10 text-red-400 border border-red-500/20";
      case "pending":
      default:
        return "bg-amber-500/10 text-amber-400 border border-amber-500/20";
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
        <h2 className="text-2xl font-semibold tracking-tight text-white">Client Hiring Requests</h2>
        <p className="mt-1 text-sm text-slate-400">Accept or reject consultation requests from clients.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {requests.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-12 text-center text-slate-500">
          No hiring requests found.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Client Name</th>
                <th className="px-6 py-4">Client Email</th>
                <th className="px-6 py-4">Fee Offer</th>
                <th className="px-6 py-4">Request Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-200">
              {requests.map((row) => (
                <tr key={row._id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-white">{row.clientName}</td>
                  <td className="px-6 py-4 text-slate-400">{row.clientEmail}</td>
                  <td className="px-6 py-4">${row.fee}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(row.date).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${getStatusBadgeClass(row.status)}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    {row.status === "pending" ? (
                      <div className="flex gap-2 justify-end">
                        <button
                          onClick={() => handleUpdateStatus(row._id, "accepted")}
                          disabled={updatingId !== null}
                          className="rounded-full bg-green-500 hover:bg-green-600 text-white px-3 py-1 text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                        >
                          Accept
                        </button>
                        <button
                          onClick={() => handleUpdateStatus(row._id, "rejected")}
                          disabled={updatingId !== null}
                          className="rounded-full bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs font-bold transition disabled:opacity-50 cursor-pointer"
                        >
                          Reject
                        </button>
                      </div>
                    ) : (
                      <span className="text-xs text-slate-500 font-semibold uppercase">{row.status}</span>
                    )}
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
