"use client";

import React, { useState } from "react";

export default function HiringHistory() {
  const [history, setHistory] = useState([
    {
      id: "hire-1",
      lawyerName: "Patricia M. Vance",
      specialization: "Family Law",
      fee: 120,
      date: "2026-06-23",
      status: "accepted", // pending, accepted, paid, rejected
    },
    {
      id: "hire-2",
      lawyerName: "Marcus A. Thorne",
      specialization: "Corporate Law",
      fee: 180,
      date: "2026-06-24",
      status: "pending",
    },
    {
      id: "hire-3",
      lawyerName: "Elena R. Rostova",
      specialization: "Criminal Defense",
      fee: 150,
      date: "2026-06-20",
      status: "paid",
    },
  ]);
  const [payingId, setPayingId] = useState(null);

  const handlePay = (id) => {
    setPayingId(id);
    // Simulate Stripe payment flow
    setTimeout(() => {
      setHistory((prev) =>
        prev.map((item) => (item.id === id ? { ...item, status: "paid" } : item))
      );
      setPayingId(null);
    }, 1500);
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

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Hiring History</h2>
        <p className="mt-1 text-sm text-slate-400">Track and pay for your active consultations.</p>
      </div>

      <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/40">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-400">
              <th className="px-6 py-4">Lawyer</th>
              <th className="px-6 py-4">Specialization</th>
              <th className="px-6 py-4">Fee</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5 text-sm text-slate-200">
            {history.map((row) => (
              <tr key={row.id} className="hover:bg-white/5 transition">
                <td className="px-6 py-4 font-medium text-white">{row.lawyerName}</td>
                <td className="px-6 py-4 text-slate-400">{row.specialization}</td>
                <td className="px-6 py-4">${row.fee}</td>
                <td className="px-6 py-4 text-slate-400">{row.date}</td>
                <td className="px-6 py-4">
                  <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${getStatusBadgeClass(row.status)}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  {row.status === "accepted" ? (
                    <button
                      onClick={() => handlePay(row.id)}
                      disabled={payingId !== null}
                      className="rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-contrast)] px-4 py-1.5 text-xs font-bold transition hover:bg-[#f8c232] cursor-pointer disabled:opacity-50"
                    >
                      {payingId === row.id ? "Processing..." : "Pay Fee"}
                    </button>
                  ) : row.status === "paid" ? (
                    <button
                      disabled
                      className="rounded-full bg-green-500/10 border border-green-500/20 text-green-400 px-4 py-1.5 text-xs font-bold opacity-60 cursor-not-allowed"
                    >
                      Paid
                    </button>
                  ) : (
                    <span className="text-xs text-slate-500 font-semibold">—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
