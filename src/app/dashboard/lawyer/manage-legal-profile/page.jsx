"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "@/lib/auth-client";

const CATEGORIES = ["Family Law", "Corporate Law", "Criminal Defense", "Property Law", "Intellectual Property", "Civil Litigation"];

export default function ManageLegalProfile() {
  const { data: session } = useSession();
  
  const [specialization, setSpecialization] = useState("Family Law");
  const [bio, setBio] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [avatar, setAvatar] = useState("");
  
  const [uploading, setUploading] = useState(false);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      if (!session?.user?.email) return;
      setLoadingProfile(true);
      setError("");
      try {
        const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
        const res = await fetch(`${apiUrl}/lawyers/email/${session.user.email}`, {
          credentials: "include"
        });
        if (res.ok) {
          const data = await res.json();
          setSpecialization(data.specialization || "Family Law");
          setBio(data.bio || "");
          setHourlyRate(data.hourlyRate || "");
          setIsAvailable(data.isAvailable !== false);
          setAvatar(data.avatar || "");
        }
      } catch (err) {
        console.error("No profile found yet or failed to load profile", err);
      } finally {
        setLoadingProfile(false);
      }
    };

    if (session?.user?.email) {
      fetchProfile();
    }
  }, [session]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    setMessage("");

    try {
      const formData = new FormData();
      formData.append("image", file);
      
      // Using a standard free/public API key for imgBB upload
      const res = await fetch("https://api.imgbb.com/1/upload?key=6a7a5ea29b8c381f2115be3cbf2b8ce7", {
        method: "POST",
        body: formData
      });

      if (!res.ok) {
        throw new Error("Failed to upload image to imgBB.");
      }

      const data = await res.json();
      if (data.success) {
        setAvatar(data.data.url);
        setMessage("Image uploaded successfully!");
      } else {
        throw new Error("imgBB upload failed.");
      }
    } catch (err) {
      setError(err.message || "Failed to upload image. Please enter a URL manually.");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");
    setMessage("");

    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('better-auth.session_token='))?.split('=')[1];
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const res = await fetch(`${apiUrl}/lawyers`, {
        method: "PUT",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({
          name: session.user.name,
          specialization,
          bio,
          hourlyRate: Number(hourlyRate),
          isAvailable,
          avatar
        })
      });

      if (!res.ok) {
        throw new Error("Failed to save profile.");
      }

      setMessage("Legal profile updated successfully!");
    } catch (err) {
      setError(err.message || "Failed to save profile details.");
    } finally {
      setSaving(false);
    }
  };

  if (loadingProfile) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 w-1/3 bg-white/5 rounded-full" />
        <div className="h-96 bg-white/5 rounded-3xl" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Manage Legal Profile</h2>
        <p className="mt-1 text-sm text-slate-400">Configure the legal consulting services you offer on LegalEase.</p>
      </div>

      {message && (
        <div className="rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
          {message}
        </div>
      )}

      {error && (
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl space-y-6">
        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <label htmlFor="category-select" className="block text-sm font-medium text-slate-300">
              Specialization / Practice Area
            </label>
            <select
              id="category-select"
              value={specialization}
              onChange={(e) => setSpecialization(e.target.value)}
              className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-200 focus:border-[var(--brand-accent)] focus:outline-none"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat} className="bg-slate-950 text-slate-200">
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="hourly-rate-input" className="block text-sm font-medium text-slate-300">
              Hourly Fee ($ USD)
            </label>
            <input
              id="hourly-rate-input"
              type="number"
              required
              min="10"
              max="1000"
              value={hourlyRate}
              onChange={(e) => setHourlyRate(e.target.value)}
              placeholder="150"
              className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="bio-input" className="block text-sm font-medium text-slate-300">
            Professional Biography
          </label>
          <textarea
            id="bio-input"
            required
            rows={5}
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Introduce yourself, your credentials, and areas of expertise..."
            className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none"
          />
        </div>

        <div>
          <label htmlFor="avatar-file" className="block text-sm font-medium text-slate-300">
            Professional Photo
          </label>
          <div className="mt-2 flex flex-col sm:flex-row gap-4 items-center rounded-3xl border border-white/10 bg-white/5 p-4">
            {avatar && (
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-2 ring-[var(--brand-accent)] bg-slate-900 flex-shrink-0">
                <img src={avatar} alt="Profile preview" className="object-cover h-full w-full" />
              </div>
            )}
            <div className="flex-grow space-y-2">
              <input
                id="avatar-file"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
                className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-semibold file:bg-white/5 file:text-slate-300 hover:file:bg-white/10 file:cursor-pointer"
              />
              <input
                id="avatar-url"
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="Or paste image URL directly..."
                className="block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none"
              />
              {uploading && <p className="text-xs text-[var(--brand-accent)] animate-pulse">Uploading to imgBB...</p>}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 pt-2">
          <input
            id="is-available-check"
            type="checkbox"
            checked={isAvailable}
            onChange={(e) => setIsAvailable(e.target.checked)}
            className="h-5 w-5 rounded border-white/10 bg-white/5 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)] cursor-pointer"
          />
          <label htmlFor="is-available-check" className="text-sm font-medium text-slate-300 cursor-pointer select-none">
            I am currently available to accept new clients
          </label>
        </div>

        <button
          type="submit"
          disabled={saving || uploading}
          className="rounded-full px-6 py-2.5 text-xs font-semibold shadow-md transition hover:bg-[#f8c232] cursor-pointer disabled:opacity-50"
          style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
        >
          {saving ? "Saving Changes..." : "Publish Profile"}
        </button>
      </form>
    </div>
  );
}
