"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function HiringHistory() {
  const { data: session } = useSession();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Payment Modal States
  const [showPayModal, setShowPayModal] = useState(false);
  const [selectedHire, setSelectedHire] = useState(null);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvc, setCvc] = useState("");
  const [paying, setPaying] = useState(false);
  const [payError, setPayError] = useState("");
  const [paySuccess, setPaySuccess] = useState(false);

  const fetchHiringHistory = async () => {
    if (!session?.user?.email) return;
    setLoading(true);
    setError("");
    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/hires/user/${session.user.email}`, {
        credentials: "include",
        headers: token ? { 'Authorization': `Bearer ${token}` } : {}
      });
      if (!res.ok) {
        throw new Error("Failed to load hiring history from the server.");
      }
      const data = await res.json();
      setHistory(data);
    } catch (err) {
      setError(err.message || "An error occurred while loading your history.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchHiringHistory();
    }
  }, [session]);

  const handleOpenPay = (hire) => {
    setSelectedHire(hire);
    setShowPayModal(true);
    setPayError("");
    setPaySuccess(false);
    setCardNumber("");
    setExpiry("");
    setCvc("");
  };

  const handleProcessPayment = async (e) => {
    e.preventDefault();
    if (!cardNumber || !expiry || !cvc) {
      setPayError("Please fill out all card details.");
      return;
    }
    setPaying(true);
    setPayError("");

    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      
      // Step 1: Create Stripe Payment Intent on Backend
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const intentRes = await fetch(`${apiUrl}/payments/create-payment-intent`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ price: selectedHire.fee })
      });

      if (!intentRes.ok) {
        throw new Error("Failed to initialize payment intent.");
      }

      const intentData = await intentRes.json();
      const clientSecret = intentData.clientSecret;

      // Step 2: Simulate client-side validation and PATCH update
      setTimeout(async () => {
        try {
          const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
          const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
          const updateRes = await fetch(`${apiUrl}/hires/${selectedHire._id}`, {
            method: "PATCH",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              ...(token ? { 'Authorization': `Bearer ${token}` } : {})
            },
            body: JSON.stringify({
              status: "paid",
              transactionId: `txn_${clientSecret ? clientSecret.split('_secret')[0] : 'mock_' + Math.random().toString(36).substr(2, 9)}`
            })
          });

          if (!updateRes.ok) {
            throw new Error("Payment was successful, but failed to update status.");
          }

          setPaySuccess(true);
          setTimeout(() => {
            setShowPayModal(false);
            fetchHiringHistory(); // Refresh the list
          }, 1500);
        } catch (err) {
          setPayError(err.message);
        } finally {
          setPaying(false);
        }
      }, 1500);

    } catch (err) {
      setPayError(err.message || "Something went wrong during payment processing.");
      setPaying(false);
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
        <div className="h-6 w-1/4 bg-white/5 rounded-full" />
        <div className="h-64 bg-white/5 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Hiring History</h2>
        <p className="mt-1 text-sm text-slate-400">Track and pay for your active consultations.</p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      {history.length === 0 ? (
        <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-12 text-center text-slate-500">
          No hiring records found.
        </div>
      ) : (
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
                <tr key={row._id} className="hover:bg-white/5 transition">
                  <td className="px-6 py-4 font-medium text-white">{row.lawyerName}</td>
                  <td className="px-6 py-4 text-slate-400">{row.specialization}</td>
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
                    {row.status === "accepted" ? (
                      <button
                        onClick={() => handleOpenPay(row)}
                        className="rounded-full bg-[var(--brand-accent)] text-[var(--brand-accent-contrast)] px-4 py-1.5 text-xs font-bold transition hover:bg-[#f8c232] cursor-pointer"
                      >
                        Pay Fee
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
      )}

      {/* Stripe Payment Modal */}
      {showPayModal && selectedHire && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="relative w-full max-w-md overflow-hidden rounded-4xl border border-white/10 bg-slate-950 p-6 shadow-2xl">
            <div className="absolute inset-x-0 top-0 h-28" style={{ background: "radial-gradient(circle at top, rgba(217,154,30,0.08), transparent 70%)" }} />
            
            {paySuccess ? (
              <div className="text-center py-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-500/10 text-green-400 mb-4">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="h-6 w-6">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-white">Payment Successful!</h3>
                <p className="mt-2 text-xs text-slate-400">Your consultation is fully booked. Setting status...</p>
              </div>
            ) : (
              <form onSubmit={handleProcessPayment}>
                <h3 className="text-xl font-semibold text-white">Stripe Payment</h3>
                <p className="mt-1 text-xs text-slate-400">
                  Paying fee for consultation with {selectedHire.lawyerName}.
                </p>

                {payError && (
                  <div className="mt-4 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-xs text-red-400">
                    {payError}
                  </div>
                )}

                <div className="mt-6 rounded-3xl bg-white/5 p-4 border border-white/5 flex justify-between text-sm text-white font-semibold mb-6">
                  <span>Total Amount</span>
                  <span className="text-[var(--brand-accent)]">${selectedHire.fee}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label htmlFor="card-num" className="block text-xs font-medium text-slate-300 mb-1">Card Number</label>
                    <input
                      id="card-num"
                      type="text"
                      required
                      placeholder="4242 4242 4242 4242"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-[var(--brand-accent)] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="card-expiry" className="block text-xs font-medium text-slate-300 mb-1">Expiry Date</label>
                      <input
                        id="card-expiry"
                        type="text"
                        required
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-[var(--brand-accent)] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label htmlFor="card-cvc" className="block text-xs font-medium text-slate-300 mb-1">CVC</label>
                      <input
                        id="card-cvc"
                        type="text"
                        required
                        placeholder="123"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                        className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-slate-600 focus:border-[var(--brand-accent)] focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowPayModal(false)}
                    disabled={paying}
                    className="flex-1 rounded-full border border-white/10 px-5 py-2.5 text-xs font-semibold text-slate-300 transition hover:bg-white/10 disabled:opacity-30 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={paying}
                    className="flex-1 justify-center flex rounded-full px-5 py-2.5 text-xs font-semibold transition hover:bg-[#f8c232] cursor-pointer disabled:opacity-30"
                    style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
                  >
                    {paying ? "Processing..." : `Pay $${selectedHire.fee}`}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
