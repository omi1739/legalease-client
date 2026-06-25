"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function AdminAnalytics() {
  const { data: session } = useSession();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalLawyers: 0,
    totalHires: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError("");
      try {
        const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
        const res = await fetch("http://localhost:5000/admin/analytics", {
          headers: token ? { 'Authorization': `Bearer ${token}` } : {}
        });
        if (!res.ok) {
          throw new Error("Failed to load analytics statistics.");
        }
        const data = await res.json();
        setStats(data);
      } catch (err) {
        setError(err.message || "An error occurred while loading stats.");
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === "admin") {
      fetchAnalytics();
    }
  }, [session]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-1/3 bg-white/5 rounded-full" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-32 bg-white/5 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Analytics Overview</h2>
        <p className="mt-1 text-sm text-slate-400">Core metrics monitoring the health and performance of LegalEase.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Stats Cards Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        
        {/* Total Users */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-md">
          <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-white/5 translate-x-6 -translate-y-6" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total Registered Users</p>
          <p className="text-4xl font-bold text-white mt-4">{stats.totalUsers}</p>
          <p className="text-[10px] text-slate-400 mt-2">All client accounts in DB</p>
        </div>

        {/* Total Lawyers */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-md">
          <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-white/5 translate-x-6 -translate-y-6" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total Lawyers</p>
          <p className="text-4xl font-bold text-white mt-4">{stats.totalLawyers}</p>
          <p className="text-[10px] text-slate-400 mt-2">Active service providers</p>
        </div>

        {/* Total Hires */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-md">
          <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-white/5 translate-x-6 -translate-y-6" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Completed Hires</p>
          <p className="text-4xl font-bold text-white mt-4">{stats.totalHires}</p>
          <p className="text-[10px] text-slate-400 mt-2">Fully paid legal counsel cases</p>
        </div>

        {/* Total Revenue */}
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40 p-6 shadow-md">
          <div className="absolute top-0 right-0 h-20 w-20 rounded-full bg-white/5 translate-x-6 -translate-y-6" />
          <p className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Total Revenue</p>
          <p className="text-4xl font-bold text-[var(--brand-accent)] mt-4">${stats.totalRevenue}</p>
          <p className="text-[10px] text-slate-400 mt-2">Sum of all transaction fees</p>
        </div>

      </div>
    </div>
  );
}
