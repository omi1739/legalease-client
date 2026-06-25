"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const Search = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.3-4.3" />
  </svg>
);

const SlidersHorizontal = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <line x1="21" y1="4" x2="14" y2="4" />
    <line x1="10" y1="4" x2="3" y2="4" />
    <line x1="21" y1="12" x2="12" y2="12" />
    <line x1="8" y1="12" x2="3" y2="12" />
    <line x1="21" y1="20" x2="16" y2="20" />
    <line x1="12" y1="20" x2="3" y2="20" />
    <line x1="14" y1="2" x2="14" y2="6" />
    <line x1="8" y1="10" x2="8" y2="14" />
    <line x1="16" y1="18" x2="16" y2="22" />
  </svg>
);

const ArrowUpDown = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="m21 16-4 4-4-4M17 20V4M3 8l4-4 4 4M7 4v16" />
  </svg>
);

const ShieldAlert = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const Award = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={props.className}>
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88" />
  </svg>
);

const CATEGORIES = ["All", "Family Law", "Corporate Law", "Criminal Defense", "Property Law", "Intellectual Property", "Civil Litigation"];

export default function BrowseLawyers() {
  // Search & Filter State
  const [search, setSearch] = useState("");
  const [specialization, setSpecialization] = useState("All");
  const [minFee, setMinFee] = useState(0);
  const [maxFee, setMaxFee] = useState(300);
  const [isAvailable, setIsAvailable] = useState(false);
  const [sortBy, setSortBy] = useState("default"); // default, low-high, high-low

  // API Data State
  const [lawyers, setLawyers] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const limit = 6;

  // Fetch data from local Express backend
  const fetchLawyers = async () => {
    setLoading(true);
    setError("");
    try {
      const queryParams = new URLSearchParams({
        search,
        specialization,
        minFee,
        maxFee,
        page: currentPage,
        limit,
      });

      if (isAvailable) {
        queryParams.append("isAvailable", "true");
      }

      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/lawyers?${queryParams.toString()}`);
      if (!res.ok) {
        throw new Error("Failed to fetch lawyers data from the server.");
      }

      const data = await res.json();
      
      // Perform client side sorting if requested
      let list = data.lawyers || [];
      if (sortBy === "low-high") {
        list.sort((a, b) => a.hourlyRate - b.hourlyRate);
      } else if (sortBy === "high-low") {
        list.sort((a, b) => b.hourlyRate - a.hourlyRate);
      }

      setLawyers(list);
      setTotalCount(data.totalCount || 0);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching lawyers.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLawyers();
  }, [search, specialization, minFee, maxFee, isAvailable, currentPage, sortBy]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearch("");
    setSpecialization("All");
    setMinFee(0);
    setMaxFee(300);
    setIsAvailable(false);
    setSortBy("default");
    setCurrentPage(1);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } },
  };

  return (
    <div className="min-h-screen bg-[#04111f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12 relative">
          <div className="absolute inset-x-0 -top-10 h-32" style={{ background: "radial-gradient(circle at top, rgba(217,154,30,0.1), transparent 60%)" }} />
          <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
            Legal Marketplace
          </span>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Browse Expert Lawyers
          </h1>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Search, filter, and compare top vetted legal professionals to find the perfect counsel.
          </p>
        </div>

        {/* Layout Grid */}
        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters Sidebar */}
          <aside className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 self-start shadow-xl backdrop-blur-md">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
              <div className="flex items-center gap-2 text-white font-semibold">
                <SlidersHorizontal className="h-4 w-4 text-[var(--brand-accent)]" />
                <span>Filters</span>
              </div>
              <button
                onClick={handleResetFilters}
                className="text-xs text-slate-400 hover:text-[var(--brand-accent)] transition cursor-pointer"
              >
                Reset All
              </button>
            </div>

            <div className="space-y-6">
              {/* Specialization Filter */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Specialization
                </label>
                <select
                  value={specialization}
                  onChange={(e) => {
                    setSpecialization(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 focus:border-[var(--brand-accent)] focus:outline-none"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat} className="bg-slate-950 text-slate-200">
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fee Range Filter */}
              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-xs font-semibold uppercase tracking-wider text-slate-400">
                    Hourly Fee Range
                  </label>
                  <span className="text-xs font-medium text-[var(--brand-accent)]">
                    ${minFee} - ${maxFee}
                  </span>
                </div>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="300"
                    step="10"
                    value={maxFee}
                    onChange={(e) => {
                      setMaxFee(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="w-full accent-[var(--brand-accent)] h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500">
                    <span>$0</span>
                    <span>$150</span>
                    <span>$300+</span>
                  </div>
                </div>
              </div>

              {/* Availability Filter */}
              <div className="flex items-center gap-3 pt-2">
                <input
                  id="available-only"
                  type="checkbox"
                  checked={isAvailable}
                  onChange={(e) => {
                    setIsAvailable(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="h-5 w-5 rounded border-white/10 bg-white/5 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] cursor-pointer"
                />
                <label htmlFor="available-only" className="text-sm font-medium text-slate-300 cursor-pointer select-none">
                  Available Only
                </label>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-6">
            {/* Search & Sort Header */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between rounded-3xl border border-white/10 bg-slate-950/40 p-4 backdrop-blur-sm">
              {/* Global Search Bar */}
              <div className="relative w-full sm:max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-500" />
                <input
                  type="text"
                  placeholder="Search by name or specialization..."
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="w-full rounded-full border border-white/10 bg-white/5 pl-12 pr-4 py-3 text-slate-200 placeholder-slate-500 focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                />
              </div>

              {/* Sort By Dropdown */}
              <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
                <span className="text-xs text-slate-400 whitespace-nowrap flex items-center gap-1">
                  <ArrowUpDown className="h-3 w-3" /> Sort by
                </span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 focus:outline-none cursor-pointer"
                >
                  <option value="default" className="bg-slate-950">Featured</option>
                  <option value="low-high" className="bg-slate-950">Fee: Low to High</option>
                  <option value="high-low" className="bg-slate-950">Fee: High to Low</option>
                </select>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-3xl border border-red-500/20 bg-red-500/10 p-6 flex items-start gap-4">
                <ShieldAlert className="h-6 w-6 text-red-400 flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-semibold text-red-200">Unable to load profiles</h3>
                  <p className="mt-1 text-sm text-red-400">{error}</p>
                  <button
                    onClick={fetchLawyers}
                    className="mt-3 inline-flex items-center justify-center rounded-full bg-red-500/20 px-4 py-1.5 text-xs font-semibold text-red-300 transition hover:bg-red-500/30 cursor-pointer"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            )}

            {/* Grid & Loading Logic */}
            {loading ? (
              // Skeleton cards while loading
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="animate-pulse rounded-4xl border border-white/10 bg-slate-950/60 p-6 space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="h-16 w-16 rounded-3xl bg-white/5" />
                      <div className="space-y-2 flex-grow">
                        <div className="h-4 w-2/3 bg-white/10 rounded-full" />
                        <div className="h-3 w-1/2 bg-white/5 rounded-full" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="h-3 w-full bg-white/5 rounded-full" />
                      <div className="h-3 w-4/5 bg-white/5 rounded-full" />
                    </div>
                    <div className="h-10 w-full bg-white/10 rounded-full" />
                  </div>
                ))}
              </div>
            ) : lawyers.length === 0 ? (
              // Empty State
              <div className="rounded-4xl border border-white/5 bg-slate-950/20 py-20 px-4 text-center">
                <Award className="h-12 w-12 text-slate-600 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white">No lawyers found</h3>
                <p className="mt-2 text-sm text-slate-400 max-w-sm mx-auto">
                  We couldn't find any lawyers matching your exact filter settings. Try relaxing your filters.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 cursor-pointer"
                >
                  Clear All Filters
                </button>
              </div>
            ) : (
              // Lawyers List Render
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="show"
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              >
                <AnimatePresence mode="popLayout">
                  {lawyers.map((lawyer) => (
                    <motion.div
                      key={lawyer.name}
                      variants={cardVariants}
                      whileHover={{ y: -8, transition: { duration: 0.2 } }}
                      className="group flex flex-col justify-between rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-md transition duration-300 hover:border-[var(--brand-accent)]/30"
                    >
                      <div>
                        {/* Avatar & Name Header */}
                        <div className="flex items-center gap-4">
                          <div className="relative h-16 w-16 overflow-hidden rounded-3xl bg-slate-900/80 ring-1 ring-white/10">
                            <Image
                              src={lawyer.avatar || "/assets/logo.png"}
                              alt={lawyer.name}
                              fill
                              sizes="64px"
                              className="object-cover"
                            />
                          </div>
                          <div>
                            <span className="inline-flex items-center gap-1 rounded-full bg-white/5 px-2.5 py-0.5 text-[10px] font-medium text-slate-400">
                              ★ {lawyer.rating}
                            </span>
                            <h3 className="mt-1 text-lg font-semibold text-white group-hover:text-[var(--brand-accent)] transition">
                              {lawyer.name}
                            </h3>
                          </div>
                        </div>

                        {/* Badges / Specialization */}
                        <div className="mt-5 flex items-center justify-between">
                          <span className="text-xs uppercase tracking-wider text-slate-400">
                            {lawyer.specialization}
                          </span>
                          <span
                            className={`rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider ${
                              lawyer.isAvailable
                                ? "bg-green-500/10 text-green-400 border border-green-500/20"
                                : "bg-red-500/10 text-red-400 border border-red-500/20"
                            }`}
                          >
                            {lawyer.isAvailable ? "Available" : "Busy"}
                          </span>
                        </div>

                        {/* Bio snippet */}
                        <p className="mt-4 text-xs leading-5 text-slate-400 line-clamp-3">
                          {lawyer.bio}
                        </p>
                      </div>

                      {/* Fee and Action Button */}
                      <div className="mt-6 pt-4 border-t border-white/5 flex items-center justify-between gap-4">
                        <div>
                          <p className="text-[10px] text-slate-500 uppercase tracking-wider">Consultation</p>
                          <p className="text-lg font-semibold text-white">${lawyer.hourlyRate} <span className="text-xs font-normal text-slate-400">/ hr</span></p>
                        </div>
                        <Link
                          href={`/browse/${lawyer.name}`}
                          className="rounded-full bg-white/5 border border-white/10 px-5 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-[var(--brand-accent)] hover:text-[var(--brand-accent-contrast)] hover:border-[var(--brand-accent)] cursor-pointer"
                        >
                          View Profile
                        </Link>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}

            {/* Pagination Controls */}
            {!loading && totalPages > 1 && (
              <div className="flex items-center justify-center gap-4 mt-12">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Previous
                </button>
                <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                >
                  Next
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}
