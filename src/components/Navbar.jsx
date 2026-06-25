"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { useSession, authClient } from "@/lib/auth-client";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Browse Lawyers", href: "/browse" },
];

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session } = useSession();
  
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const activeTheme = document.documentElement.classList.contains("dark") ? "dark" : "light";
    setTheme(activeTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    if (nextTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  };

  const role = session?.user?.role || "user";

  // Dynamic Dashboard links based on role
  const getDashboardLinks = () => {
    switch (role) {
      case "admin":
        return [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Manage Users", href: "/dashboard/admin/manage-users" },
          { label: "Transactions", href: "/dashboard/admin/all-transactions" },
          { label: "Analytics", href: "/dashboard/admin/analytics" },
        ];
      case "lawyer":
        return [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Hiring History", href: "/dashboard/lawyer/hiring-history" },
          { label: "Manage Services", href: "/dashboard/lawyer/manage-legal-profile" },
        ];
      case "user":
      default:
        return [
          { label: "Dashboard", href: "/dashboard" },
          { label: "Hiring History", href: "/dashboard/user/hiring-history" },
          { label: "Update Profile", href: "/dashboard/user/update-profile" },
          { label: "My Comments", href: "/dashboard/user/comments" },
        ];
    }
  };

  const dashboardLinks = getDashboardLinks();

  const closeMobile = useCallback(() => setMobileOpen(false), []);

  const handleLogout = async () => {
    await authClient.signOut();
    router.push("/");
    router.refresh();
  };

  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter" && searchVal.trim()) {
      router.push(`/browse?search=${encodeURIComponent(searchVal.trim())}`);
      setSearchVal("");
      closeMobile();
    }
  };

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
    <header className="sticky top-0 z-50 border-b border-[var(--border)] bg-[var(--surface)]/80 backdrop-blur-md shadow-xl">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link href="/" className="flex items-center gap-3" onClick={closeMobile}>
          <img src="/assets/logo.png" alt="LegalEase Logo" className="h-10 w-auto object-contain" />
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-[var(--text-muted)]">
              LegalEase
            </p>
            <p className="text-sm font-semibold text-[var(--foreground)]">
              Legal marketplace
            </p>
          </div>
        </Link>

        <button
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] transition hover:bg-[var(--surface-soft)] sm:hidden"
          onClick={() => setMobileOpen((c) => !c)}
          aria-label="Toggle navigation menu"
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          )}
        </button>

        <div className="hidden flex-1 items-center justify-end gap-4 sm:flex">
          <nav className="flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--surface-soft)] p-2 shadow-sm">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    active
                      ? "bg-[var(--brand-accent)] text-[var(--brand-accent-contrast)] shadow-lg shadow-[var(--brand-accent)]/20"
                      : "text-[var(--text-muted)] hover:text-[var(--foreground)]"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}

            {session && (
              <div className="relative dashboard-dropdown">
                <button
                  onClick={() => setDropdownOpen((c) => !c)}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-[var(--text-muted)] transition hover:text-[var(--foreground)]"
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
                  <div className="absolute left-0 top-full mt-2 w-48 rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 shadow-2xl">
                    {dashboardLinks.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setDropdownOpen(false)}
                        className="block rounded-2xl px-4 py-2 text-sm text-[var(--foreground)] transition hover:bg-[var(--surface-soft)]"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </nav>

          <div className="flex items-center gap-3">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 dark:border-zinc-800 bg-transparent text-slate-800 dark:text-slate-200 transition hover:bg-slate-100 dark:hover:bg-zinc-800 cursor-pointer"
              aria-label="Toggle Theme"
            >
              {theme === "dark" ? (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                </svg>
              ) : (
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
            <div className="hidden items-center rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-3 py-2 text-[var(--foreground)] shadow-sm lg:flex">
              <input
                type="search"
                placeholder="Search lawyers"
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-48 bg-transparent text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none"
              />
            </div>

            {session ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-[var(--text-muted)] font-medium hidden md:inline">
                  {session.user.name}
                </span>
                <button
                  onClick={handleLogout}
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-2 text-sm font-medium text-[var(--foreground)] transition hover:opacity-90 cursor-pointer"
                >
                  Logout
                </button>
              </div>
            ) : (
              <>
                <Link
                  href="/signup"
                  className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-5 py-2 text-sm font-medium text-[var(--foreground)] transition hover:opacity-90"
                >
                  Sign Up
                </Link>
                <Link
                  href="/login"
                  className="rounded-full px-5 py-2 text-sm font-semibold shadow-[0_10px_25px_-5px_rgba(99,102,241,0.3)] transition hover:opacity-90"
                  style={{
                    backgroundColor: "var(--brand-accent)",
                    color: "var(--brand-accent-contrast)",
                  }}
                >
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="sm:hidden border-t border-[var(--border)] bg-[var(--background)]/95 px-4 py-5 backdrop-blur-xl">
          <div className="space-y-3">
            <div className="flex items-center justify-between rounded-full border border-white/10 bg-slate-950/80 px-4 py-2.5 text-slate-200 w-full mb-4">
              <span className="text-sm font-medium">Theme Mode</span>
              <button
                onClick={toggleTheme}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-200 dark:border-zinc-800 bg-transparent transition hover:bg-slate-100 dark:hover:bg-zinc-800"
              >
                {theme === "dark" ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                  </svg>
                )}
              </button>
            </div>

            <div className="flex items-center rounded-full border border-white/10 bg-slate-950/80 px-3 py-2 text-slate-200 shadow-sm shadow-slate-950/10 w-full mb-4">
              <input
                type="search"
                placeholder="Search lawyers..."
                value={searchVal}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>

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

            {session && (
              <div className="rounded-2xl border border-white/10 bg-slate-950/85 p-4">
                <p className="text-xs uppercase tracking-widest text-slate-500 font-semibold mb-2">Dashboard</p>
                <div className="space-y-2">
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
            )}

            {session ? (
              <button
                onClick={() => {
                  handleLogout();
                  closeMobile();
                }}
                className="w-full text-center block rounded-full border border-white/10 bg-red-500/10 text-red-400 px-4 py-3 text-sm font-semibold transition hover:bg-red-500/20 cursor-pointer"
              >
                Logout ({session.user.name})
              </button>
            ) : (
              <>
                <Link
                  href="/signup"
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
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
