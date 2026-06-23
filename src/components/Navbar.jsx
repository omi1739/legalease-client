"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Lawyers", href: "/browse" },
];

const dashboardLinks = [
  { label: "User Dashboard", href: "/dashboard/user/hiring-history" },
  { label: "Lawyer Dashboard", href: "/dashboard/lawyer/hiring-history" },
  { label: "Admin Dashboard", href: "/dashboard/admin/manage-users" },
];

const Navbar = () => {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".dashboard-dropdown")) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") setDropdownOpen(false);
    };
    document.addEventListener("keydown", handleEsc);
    return () => document.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#041927]/95 backdrop-blur-xl shadow-2xl shadow-slate-950/10">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
          <div className="relative h-12 w-12 overflow-hidden rounded-3xl bg-slate-950/80 ring-1 ring-white/10">
            <Image
              src="/assets/logo.png"
              alt="LegalEase logo"
              fill
              className="object-cover"
            />
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-slate-400">
              LegalEase
            </p>
            <p className="text-sm font-semibold text-white">
              Legal marketplace
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/80 text-slate-100 transition hover:bg-slate-900/90 sm:hidden"
          onClick={() => setMobileOpen((c) => !c)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg
              viewBox="0 0 24 24"
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
          <nav className="flex items-center gap-2 rounded-full border border-white/10 bg-slate-950/70 p-2 shadow-sm shadow-slate-950/10">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[#0b3c74] text-white"
                      : "text-slate-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="relative dashboard-dropdown">
              <button
                onClick={() => setDropdownOpen((c) => !c)}
                className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-slate-300 transition hover:text-white"
                aria-expanded={dropdownOpen}
                aria-haspopup="true"
              >
                Dashboard
                <svg
                  viewBox="0 0 20 20"
                  className={`h-4 w-4 transition duration-200 ${dropdownOpen ? "rotate-180" : ""}`}
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06-.02L10 10.585l3.71-3.395a.75.75 0 1 1 1.02 1.1l-4.2 3.846a.75.75 0 0 1-1.02 0L5.25 8.29a.75.75 0 0 1-.02-1.08z" />
                </svg>
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 top-full mt-2 w-48 rounded-3xl border border-white/10 bg-slate-950/95 p-3 shadow-2xl shadow-slate-950/20">
                  {dashboardLinks.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setDropdownOpen(false)}
                      className="block rounded-2xl px-4 py-2 text-sm text-slate-200 transition hover:bg-slate-900"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </nav>

            <div className="flex items-center gap-3">
            <div className="hidden items-center rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-slate-200 shadow-sm shadow-slate-950/10 lg:flex">
              <input
                type="search"
                placeholder="Search lawyers"
                className="w-48 bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
            <Link
              href="/register"
              className="rounded-full border border-white/10 bg-white/5 px-5 py-2 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              className="rounded-full px-5 py-2 text-sm font-semibold shadow-[0_14px_30px_-10px_rgba(217,154,30,0.25)] transition hover:bg-[#fabf4a]"
              style={{
                backgroundColor: "var(--brand-accent)",
                color: "var(--brand-accent-contrast)",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-white/10 bg-[#041927]/95 px-4 py-5 backdrop-blur-xl">
          <div className="space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={closeMobile}
                className="block rounded-2xl border border-white/10 bg-slate-950/85 px-4 py-3 text-sm font-medium text-slate-200 transition hover:bg-slate-900"
              >
                {link.label}
              </Link>
            ))}
            <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-4">
              <p className="text-sm text-slate-400">Dashboard</p>
              <div className="mt-3 space-y-2">
                {dashboardLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={closeMobile}
                    className="block rounded-xl bg-slate-900 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
            <Link
              href="/register"
              onClick={closeMobile}
              className="block rounded-full border border-white/10 bg-white/5 px-4 py-3 text-center text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
            >
              Sign Up
            </Link>
            <Link
              href="/login"
              onClick={closeMobile}
              className="block rounded-full px-4 py-3 text-center text-sm font-semibold"
              style={{
                backgroundColor: "var(--brand-accent)",
                color: "var(--brand-accent-contrast)",
              }}
            >
              Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
