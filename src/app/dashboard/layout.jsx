"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "@/lib/auth-client";

// Custom SVG Icons for Sidebar
const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" />
  </svg>
);

const HistoryIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 8v4l3 3" /><circle cx="12" cy="12" r="9" />
  </svg>
);

const EditIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
  </svg>
);

const MessageIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

const BriefcaseIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <rect x="2" y="7" width="20" height="14" rx="2" ry="2" /><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

const UsersIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const DollarIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </svg>
);

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5">
    <line x1="18" y1="20" x2="18" y2="10" /><line x1="12" y1="20" x2="12" y2="4" /><line x1="6" y1="20" x2="6" y2="14" />
  </svg>
);

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const { data: session, isPending: loading } = useSession();

  const role = session?.user?.role || "user"; // "user" (Client), "lawyer", or "admin"

  // Dynamic Navigation items based on role
  const getNavItems = () => {
    switch (role) {
      case "admin":
        return [
          { label: "Admin Profile", href: "/dashboard", icon: <UserIcon /> },
          { label: "Manage Users", href: "/dashboard/admin/manage-users", icon: <UsersIcon /> },
          { label: "All Transactions", href: "/dashboard/admin/all-transactions", icon: <DollarIcon /> },
          { label: "Analytics Overview", href: "/dashboard/admin/analytics", icon: <ChartIcon /> },
        ];
      case "lawyer":
        return [
          { label: "Lawyer Profile", href: "/dashboard", icon: <UserIcon /> },
          { label: "Hiring History", href: "/dashboard/lawyer/hiring-history", icon: <HistoryIcon /> },
          { label: "Manage Services", href: "/dashboard/lawyer/manage-legal-profile", icon: <BriefcaseIcon /> },
        ];
      case "user":
      default:
        return [
          { label: "My Profile", href: "/dashboard", icon: <UserIcon /> },
          { label: "Hiring History", href: "/dashboard/user/hiring-history", icon: <HistoryIcon /> },
          { label: "Update Profile", href: "/dashboard/user/update-profile", icon: <EditIcon /> },
          { label: "My Comments", href: "/dashboard/user/comments", icon: <MessageIcon /> },
        ];
    }
  };

  const navItems = getNavItems();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#04111f] flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="h-10 w-10 border-4 border-t-[var(--brand-accent)] border-white/10 rounded-full animate-spin mx-auto" />
          <p className="text-sm text-slate-400">Loading Dashboard session...</p>
        </div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="min-h-screen bg-[#04111f] flex items-center justify-center px-4">
        <div className="text-center rounded-4xl border border-white/10 bg-slate-950/80 p-10 max-w-md shadow-2xl">
          <h3 className="text-xl font-semibold text-white">Access Denied</h3>
          <p className="mt-2 text-sm text-slate-400">
            Please log in to view your account dashboard.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex items-center justify-center rounded-full px-8 py-3 text-sm font-semibold transition hover:bg-[#f8c232] cursor-pointer"
            style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04111f] py-8 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl grid gap-8 lg:grid-cols-[280px_1fr]">
        
        {/* Sidebar */}
        <aside className="rounded-3xl border border-white/10 bg-slate-950/80 p-6 self-start shadow-xl backdrop-blur-md">
          <div className="border-b border-white/10 pb-4 mb-6">
            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Logged in as</p>
            <p className="text-base font-semibold text-white mt-1 truncate">{session.user.name}</p>
            <span className="inline-flex rounded-full bg-[var(--brand-accent)]/10 px-2.5 py-0.5 text-[10px] font-medium text-[var(--brand-accent)] uppercase tracking-wider mt-1.5 border border-[var(--brand-accent)]/20">
              {role}
            </span>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition cursor-pointer ${
                    active
                      ? "bg-white/10 text-white border-l-2 border-[var(--brand-accent)]"
                      : "text-slate-400 hover:bg-white/5 hover:text-white"
                  }`}
                >
                  <span className={active ? "text-[var(--brand-accent)]" : "text-slate-400"}>
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="rounded-4xl border border-white/10 bg-slate-950/40 p-8 backdrop-blur-sm min-h-[600px] shadow-2xl">
          {children}
        </main>
      </div>
    </div>
  );
}
