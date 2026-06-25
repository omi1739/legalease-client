"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function AllTransactions() {
  const { data: session } = useSession();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchTransactions = async () => {
      setLoading(true);
      setError("");
      try {
        const token = session?.session?.token;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/admin/transactions`, {
          credentials: "include",
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (!res.ok) {
          throw new Error("Failed to load transactions.");
        }
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        setError(err.message || "An error occurred while loading transactions.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === "admin") {
      fetchTransactions();
    }
  }, [session]);

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
        <h2 className="text-2xl font-semibold tracking-tight text-white">All Transactions</h2>
        <p className="mt-1 text-sm text-slate-400">Log of all successfully processed Stripe payments.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {transactions.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-12 text-center text-slate-500">
          No transactions registered in the database.
        </div>
      ) : (
        <div className="overflow-x-auto rounded-3xl border border-white/10 bg-slate-950/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/10 bg-white/5 text-xs font-semibold uppercase tracking-wider text-slate-400">
                <th className="px-6 py-4">Transaction ID</th>
                <th className="px-6 py-4">Client Email</th>
                <th className="px-6 py-4">Lawyer Email</th>
                <th className="px-6 py-4">Amount Paid</th>
                <th className="px-6 py-4">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-sm text-slate-200">
              {transactions.map((row) => (
                <tr key={row._id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-mono text-xs text-[var(--brand-accent)]">{row.transactionId}</td>
                  <td className="px-6 py-4 text-slate-300">{row.clientEmail}</td>
                  <td className="px-6 py-4 text-slate-300">{row.lawyerEmail}</td>
                  <td className="px-6 py-4 font-semibold text-white">${row.fee}</td>
                  <td className="px-6 py-4 text-slate-400">
                    {new Date(row.date).toLocaleDateString()}
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
