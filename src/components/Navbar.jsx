"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

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
  const [search, setSearch] = useState("");

  return (
    <header
      className="text-slate-100 shadow-sm sticky top-0 z-50"
      style={{
        backgroundColor: "var(--brand-primary)",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
      }}
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/"
          className="flex items-center gap-3 font-semibold text-xl tracking-tight text-white"
        >
          <div
            className="relative h-10 w-10 overflow-hidden rounded-full bg-slate-950/80"
            style={{ borderColor: "var(--brand-primary)", borderWidth: 1 }}
          >
            <Image
              src="/assets/logo.png"
              alt="LegalEase logo"
              fill
              className="object-cover"
            />
          </div>
          <span
            className="text-base font-semibold uppercase tracking-[0.12em] sm:text-lg"
            style={{ color: "var(--brand-accent)" }}
          >
            LegalEase
          </span>
        </Link>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-md bg-slate-900/80 p-2 text-slate-200 transition sm:hidden"
          style={{ borderColor: "var(--brand-primary)", borderWidth: 1 }}
          onClick={() => setMobileOpen((current) => !current)}
          aria-label="Toggle navigation menu"
        >
          <span className="sr-only">Toggle navigation menu</span>
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

        <nav
          className={`w-full sm:flex sm:w-auto ${mobileOpen ? "block" : "hidden"}`}
        >
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-slate-800 hover:text-white text-slate-300`}
                  style={
                    active
                      ? {
                          backgroundColor: "rgba(7,43,82,0.12)",
                          color: "var(--brand-accent)",
                        }
                      : undefined
                  }
                >
                  {link.label}
                </Link>
              );
            })}

            <div className="group relative">
              <button
                type="button"
                className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-slate-300"
                style={{ transition: "background-color .15s" }}
              >
                Dashboard
                <svg
                  viewBox="0 0 20 20"
                  className="h-4 w-4"
                  fill="currentColor"
                >
                  <path d="M5.23 7.21a.75.75 0 0 1 1.06-.02L10 10.585l3.71-3.395a.75.75 0 1 1 1.02 1.1l-4.2 3.846a.75.75 0 0 1-1.02 0L5.25 8.29a.75.75 0 0 1-.02-1.08z" />
                </svg>
              </button>
              <div className="invisible absolute left-0 top-full mt-2 w-48 rounded-xl border border-slate-800 bg-slate-950/95 p-3 opacity-0 shadow-xl shadow-slate-950/20 transition-all duration-150 group-hover:visible group-hover:opacity-100">
                {dashboardLinks.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-sm text-slate-200 hover:bg-slate-800"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>

            <Link
              href="/login"
              className="hidden rounded-md px-4 py-2 text-sm font-semibold sm:inline-flex"
              style={{
                backgroundColor: "var(--brand-accent)",
                color: "var(--brand-accent-contrast)",
                boxShadow: "0 8px 24px rgba(217,154,30,0.12)",
              }}
            >
              Login
            </Link>
          </div>
        </nav>

        <form
          onSubmit={(event) => event.preventDefault()}
          className={`w-full sm:w-auto ${mobileOpen ? "block" : "hidden"} sm:block`}
        >
          <label htmlFor="global-search" className="sr-only">
            Search lawyers
          </label>
          <div className="relative flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900/90 px-3 py-2 shadow-inner sm:px-4">
            <input
              id="global-search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search lawyers"
              className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              type="search"
            />
            <button
              type="submit"
              className="inline-flex h-9 items-center justify-center rounded-full px-3 text-sm font-semibold"
              style={{
                backgroundColor: "var(--brand-accent)",
                color: "var(--brand-accent-contrast)",
              }}
            >
              Search
            </button>
          </div>
        </form>
      </div>
    </header>
  );
};

export default Navbar;
