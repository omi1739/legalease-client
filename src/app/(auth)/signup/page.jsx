"use client";

import React, { useState } from "react";
import Link from "next/link";
import { signUp, signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

export default function SignUpPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user", // "user" (Client) or "lawyer" (Lawyer)
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const { name, email, password, confirmPassword, role } = formData;

    if (!name || !email || !password || !confirmPassword) {
      setError("All fields are required.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setLoading(true);

    const { data, error: authError } = await signUp.email({
      email,
      password,
      name,
      role, // Pass custom fields directly at the root level in Better Auth
      callbackURL: "/",
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Failed to create account. Please try again.");
    } else {
      setSuccess(`Registration successful! Redirecting...`);
      // Fallback redirection in case callbackURL doesn't trigger immediately
      setTimeout(() => {
        router.push("/");
      }, 1500);
    }
  };

  const handleGoogleLogin = async () => {
    setError("");
    setSuccess("");
    try {
      await signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      setError("Google registration failed. Please try again.");
      console.error(err);
    }
  };

  return (
    <div className="flex min-h-[85vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-transparent">
      <div className="relative w-full max-w-lg overflow-hidden rounded-4xl border border-white/5 bg-slate-950/80 p-8 shadow-[0_40px_120px_-48px_rgba(0,0,0,0.5)] backdrop-blur-xl sm:p-10">
        <div className="absolute inset-x-0 top-0 h-40" style={{ background: "radial-gradient(circle at top, rgba(99,102,241,0.08), transparent 70%)" }} />
        
        <div className="relative text-center">
          <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Create an Account
          </h2>
          <p className="mt-2 text-sm text-slate-400">
            Join LegalEase today and get professional counsel or publish services.
          </p>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 rounded-2xl border border-green-500/20 bg-green-500/10 p-4 text-sm text-green-400">
            {success}
          </div>
        )}

        <form className="relative mt-8 space-y-6" onSubmit={handleSubmit}>
          {/* Role selection */}
          <div>
            <label className="text-sm font-medium text-slate-300">Choose Your Role</label>
            <div className="mt-3 grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => handleRoleSelect("user")}
                className={`flex flex-col items-center justify-center rounded-3xl border p-4 transition-all duration-200 cursor-pointer ${
                  formData.role === "user"
                    ? "border-[var(--brand-accent)] bg-white/5 text-white"
                    : "border-white/10 bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 mb-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                  />
                </svg>
                <span className="font-semibold text-sm">Client / User</span>
                <span className="text-xs mt-1 opacity-70">I need legal help</span>
              </button>

              <button
                type="button"
                onClick={() => handleRoleSelect("lawyer")}
                className={`flex flex-col items-center justify-center rounded-3xl border p-4 transition-all duration-200 cursor-pointer ${
                  formData.role === "lawyer"
                    ? "border-[var(--brand-accent)] bg-white/5 text-white"
                    : "border-white/10 bg-transparent text-slate-400 hover:border-white/20 hover:text-slate-300"
                }`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="h-6 w-6 mb-2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 21v-8.25M15.75 21v-8.25M8.25 21v-8.25M3 9l9-6 9 6m-1.5 12V10.339a.75.75 0 0 0-.19-.499L12 3.178 4.69 9.84a.75.75 0 0 0-.19.499V21h15Z"
                  />
                </svg>
                <span className="font-semibold text-sm">Lawyer</span>
                <span className="text-xs mt-1 opacity-70">I offer legal advice</span>
              </button>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-300">
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                placeholder="Siyam Islam Omi"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                placeholder="example@domain.com"
              />
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                  placeholder="••••••••"
                />
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="mt-2 block w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-slate-500 shadow-sm focus:border-[var(--brand-accent)] focus:outline-none focus:ring-1 focus:ring-[var(--brand-accent)]"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="show-password"
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-[var(--brand-accent)] focus:ring-[var(--brand-accent)]"
              />
              <label htmlFor="show-password" className="ml-2 block text-sm text-slate-400">
                Show Password
              </label>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="flex w-full justify-center rounded-full px-8 py-3 text-sm font-semibold shadow-[0_10px_25px_-5px_rgba(99,102,241,0.3)] transition hover:opacity-90 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
            >
              {loading ? "Creating Account..." : "Sign Up"}
            </button>
          </div>

          <div className="relative flex py-2 items-center">
            <div className="flex-grow border-t border-white/10"></div>
            <span className="flex-shrink mx-4 text-slate-500 text-xs uppercase tracking-wider">Or register with</span>
            <div className="flex-grow border-t border-white/10"></div>
          </div>

          <div>
            <button
              type="button"
              onClick={handleGoogleLogin}
              className="flex w-full items-center justify-center gap-3 rounded-full border border-white/10 bg-white/5 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10 cursor-pointer"
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
                <g transform="matrix(1, 0, 0, 1, 0, 0)">
                  <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4C21.68,11.83 21.56,11.43 21.35,11.1z" fill="#4285F4" />
                  <path d="M12,21c2.43,0 4.47,-0.8 5.96,-2.18l-3.3,-2.58c-0.92,0.62 -2.1,0.98 -3.66,0.98 -2.82,0 -5.2,-1.9 -6.05,-4.47H1.54v2.66C3.02,18.3 7.23,21 12,21z" fill="#34A853" />
                  <path d="M5.95,12.73c-0.22,-0.66 -0.35,-1.37 -0.35,-2.1c0,-0.73 0.13,-1.44 0.35,-2.1V5.87H1.54C0.56,7.83 0,10.02 0,12.3c0,2.28 0.56,4.47 1.54,6.43L5.95,12.73z" fill="#FBBC05" />
                  <path d="M12,5.7c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,2.9 14.43,2 12,2 7.23,2 3.02,4.7 1.54,8.13l4.41,3.42C6.8,9 9.18,5.7 12,5.7z" fill="#EA4335" />
                </g>
              </svg>
              <span>Continue with Google</span>
            </button>
          </div>
        </form>

        <div className="mt-8 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[var(--brand-accent)] hover:underline">
            Log in
          </Link>
        </div>
      </div>
    </div>
  );
}
