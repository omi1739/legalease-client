"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

export default function UpdateProfile() {
  const { data: session, refetch } = useSession();
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (session?.user) {
      setName(session.user.name || "");
      setImage(session.user.image || "");
    }
  }, [session]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session?.user?.email) {
      setMessage("You must be logged in to update your profile.");
      return;
    }
    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(`http://localhost:5000/users/${session.user.email}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, image }),
      });

      if (!response.ok) {
        throw new Error("Failed to update profile");
      }

      const result = await response.json();
      setMessage("Profile updated successfully!");
      
      // Sync/Refresh frontend session
      await refetch();
    } catch (err) {
      console.error(err);
      setMessage("Error updating profile. Please try again.");
    } finally {
      setLoading(false);
    }
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
