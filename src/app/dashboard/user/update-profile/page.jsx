"use client";

import React, { useState } from "react";
import { useSession } from "@/lib/auth-client";

export default function UpdateProfile() {
  const { data: session } = useSession();
  const [name, setName] = useState(session?.user?.name || "");
  const [image, setImage] = useState(session?.user?.image || "");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Simulate profile update
    setTimeout(() => {
      setLoading(false);
      setMessage("Profile updated successfully (Mock)!");
    }, 1200);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Update Profile</h2>
        <p className="mt-1 text-sm text-slate-400">Modify your public details displayed on LegalEase.</p>
      </div>

      {message && (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-md space-y-6">
        <div>
          <label htmlFor="profile-name" className="block text-sm font-medium text-slate-300">
            Full Name
          </label>
          <input
            id="profile-name"
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none"
            placeholder="John Doe"
          />
        </div>

        <div>
          <label htmlFor="profile-image" className="block text-sm font-medium text-slate-300">
            Profile Picture URL
          </label>
          <input
            id="profile-image"
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none"
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="rounded-full px-6 py-2.5 text-xs font-semibold shadow-[0_14px_30px_-10px_rgba(217,154,30,0.25)] transition hover:bg-[#f8c232] cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
        >
          {loading ? "Updating..." : "Save Changes"}
        </button>
      </form>
    </div>
  );
}
