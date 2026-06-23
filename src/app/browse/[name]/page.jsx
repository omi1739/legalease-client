"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useSession } from "@/lib/auth-client";
import { motion, AnimatePresence } from "framer-motion";

// Custom SVG Icons
const ArrowLeft = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
    <path d="m15 18-6-6 6-6" />
  </svg>
);

const Calendar = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--brand-accent)]">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const Star = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-[var(--brand-accent)]">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const Briefcase = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const Shield = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const HelpCircle = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-12 w-12 text-slate-500 mx-auto mb-4">
    <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-slate-400">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

export default function LawyerDetails() {
  const params = useParams();
  const router = useRouter();
  const { data: session, isPending: sessionLoading } = useSession();
  
  const decodedName = params?.name ? decodeURIComponent(params.name) : "";

  // Component States
  const [lawyer, setLawyer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [hiringProcessing, setHiringProcessing] = useState(false);
  const [hiringSuccess, setHiringSuccess] = useState(false);

  useEffect(() => {
    if (!decodedName) return;

    const fetchLawyerDetails = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await fetch(`http://localhost:5000/lawyers/${encodeURIComponent(decodedName)}`);
        if (!res.ok) {
          if (res.status === 404) {
            throw new Error("Lawyer profile not found.");
          }
          throw new Error("Failed to fetch lawyer profile.");
        }
        const data = await res.json();
        setLawyer(data);
      } catch (err) {
        setError(err.message || "An unexpected error occurred.");
      } finally {
        setLoading(false);
      }
    };

    fetchLawyerDetails();
  }, [decodedName]);

  const handleHireClick = () => {
    if (!session) {
      // If not authenticated, redirect to login
      router.push(`/login?callbackUrl=/browse/${encodeURIComponent(decodedName)}`);
      return;
    }
    setShowModal(true);
  };

  const handleConfirmHiring = () => {
    setHiringProcessing(true);
    // Simulate API request/Stripe routing
    setTimeout(() => {
      setHiringProcessing(false);
      setHiringSuccess(true);
      setTimeout(() => {
        setShowModal(false);
        setHiringSuccess(false);
        // Redirect to user hiring history dashboard
        router.push("/dashboard/user/hiring-history");
      }, 2000);
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04111f] py-16 px-4">
        <div className="mx-auto max-w-5xl animate-pulse space-y-8">
          <div className="h-6 w-32 bg-white/5 rounded-full" />
          <div className="grid gap-8 md:grid-cols-[1fr_2fr]">
            <div className="h-[400px] bg-white/5 rounded-4xl" />
            <div className="space-y-6">
              <div className="h-8 w-1/3 bg-white/10 rounded-full" />
              <div className="h-4 w-1/4 bg-white/5 rounded-full" />
              <div className="h-24 w-full bg-white/5 rounded-3xl" />
              <div className="h-12 w-full bg-white/10 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !lawyer) {
    return (
      <div className="min-h-screen bg-[#04111f] flex items-center justify-center py-16 px-4">
        <div className="text-center rounded-4xl border border-white/5 bg-slate-950/20 p-12 max-w-md">
          <HelpCircle />
          <h3 className="text-xl font-semibold text-white">Profile unavailable</h3>
          <p className="mt-2 text-sm text-slate-400">
            {error || "We could not find the lawyer you were looking for."}
          </p>
          <Link
            href="/browse"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-6 py-2.5 text-sm font-medium text-slate-200 transition hover:bg-white/10 cursor-pointer"
          >
            <ArrowLeft /> Return to Browse
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04111f] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Back navigation */}
        <Link
          href="/browse"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-white transition mb-8 cursor-pointer"
        >
          <ArrowLeft /> Back to Browse
        </Link>

        {/* Details Grid */}
        <div className="grid gap-8 md:grid-cols-[320px_1fr]">
          
          {/* Left Column: Avatar & Quick Action */}
          <div className="space-y-6">
            <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-950/80 p-6 shadow-xl backdrop-blur-md">
              <div className="relative h-64 w-full overflow-hidden rounded-3xl bg-slate-900 ring-1 ring-white/10">
                <Image
                  src={lawyer.avatar || "/assets/logo.png"}
                  alt={lawyer.name}
                  fill
                  sizes="280px"
                  className="object-cover"
                  priority
                />
              </div>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center">
                  <span
                    className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-wider ${
                      lawyer.isAvailable
                        ? "bg-green-500/10 text-green-400 border border-green-500/20"
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                  >
                    {lawyer.isAvailable ? "Available" : "Busy"}
                  </span>
                  <div className="flex items-center gap-1 text-sm font-semibold text-white">
                    <Star />
                    <span>{lawyer.rating}</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-4">
                  <p className="text-[10px] text-slate-500 uppercase tracking-widest">Consultation Fee</p>
                  <p className="text-2xl font-bold text-white mt-1">
                    ${lawyer.hourlyRate} <span className="text-xs font-medium text-slate-400">/ hour</span>
                  </p>
                </div>

                <button
                  onClick={handleHireClick}
                  disabled={!lawyer.isAvailable}
                  className="w-full justify-center flex rounded-full px-8 py-3 text-sm font-semibold shadow-[0_18px_60px_-28px_rgba(217,154,30,0.7)] transition hover:bg-[#f8c232] cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
                >
                  {lawyer.isAvailable ? "Hire Professional" : "Currently Fully Booked"}
                </button>
              </div>
            </div>
          </div>

          {/* Right Column: Information Tabs */}
          <div className="space-y-6">
            <div className="rounded-4xl border border-white/10 bg-slate-950/80 p-8 shadow-xl backdrop-blur-md">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-[var(--brand-accent)] font-semibold">
                  {lawyer.specialization} Expert
                </p>
                <h2 className="text-3xl font-semibold tracking-tight text-white mt-2">
                  {lawyer.name}
                </h2>
              </div>

              {/* Bio Section */}
              <div className="mt-8 border-t border-white/5 pt-6">
                <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
                  Professional Biography
                </h4>
                <p className="mt-4 text-sm leading-7 text-slate-300">
                  {lawyer.bio}
                </p>
              </div>

              {/* Specifications / Highlights */}
              <div className="mt-8 grid gap-4 sm:grid-cols-2 border-t border-white/5 pt-6">
                <div className="flex gap-3 items-start rounded-3xl bg-white/5 p-4">
                  <Briefcase />
                  <div>
                    <h5 className="text-xs font-semibold text-white uppercase tracking-wide">Experience</h5>
                    <p className="text-xs text-slate-400 mt-1">{lawyer.hires}+ completed cases</p>
                  </div>
                </div>

                <div className="flex gap-3 items-start rounded-3xl bg-white/5 p-4">
                  <Clock />
                  <div>
                    <h5 className="text-xs font-semibold text-white uppercase tracking-wide">Consultation Hours</h5>
                    <p className="text-xs text-slate-400 mt-1">Mon - Fri, 9:00 AM - 5:00 PM</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hiring Confirmation Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="relative w-full max-w-md overflow-hidden rounded-4xl border border-white/10 bg-slate-950 p-6 shadow-2xl"
            >
              <div className="absolute inset-x-0 top-0 h-28" style={{ background: "radial-gradient(circle at top, rgba(217,154,30,0.08), transparent 70%)" }} />
              
              {hiringSuccess ? (
                <div className="text-center py-8">
                  <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400 mb-4">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white">Hiring Confirmed!</h3>
                  <p className="mt-2 text-xs text-slate-400">Your request has been sent. Redirecting to history...</p>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold text-white">Confirm Hiring Request</h3>
                  <p className="mt-2 text-xs text-slate-400">
                    You are requesting a legal consultation session with {lawyer.name}.
                  </p>

                  <div className="mt-6 rounded-3xl bg-white/5 p-4 border border-white/5 space-y-3">
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Rate (Hourly)</span>
                      <span className="font-semibold text-white">${lawyer.hourlyRate}</span>
                    </div>
                    <div className="flex justify-between text-xs text-slate-400">
                      <span>Processing Fee</span>
                      <span className="font-semibold text-white">$5.00</span>
                    </div>
                    <div className="border-t border-white/5 pt-3 flex justify-between text-sm text-white font-semibold">
                      <span>Due Now</span>
                      <span className="text-[var(--brand-accent)]">${lawyer.hourlyRate + 5}</span>
                    </div>
                  </div>

                  <div className="mt-8 flex gap-3">
                    <button
                      onClick={() => setShowModal(false)}
                      disabled={hiringProcessing}
                      className="flex-1 rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={handleConfirmHiring}
                      disabled={hiringProcessing}
                      className="flex-1 justify-center flex rounded-full px-5 py-2.5 text-xs font-semibold transition hover:bg-[#f8c232] cursor-pointer disabled:opacity-30"
                      style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
                    >
                      {hiringProcessing ? "Sending..." : "Confirm & Pay"}
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
