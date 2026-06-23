"use client";

import React from "react";
import Link from "next/link";
import { useSession } from "@/lib/auth-client";

export default function ProfileDashboard() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-semibold tracking-tight text-white">Profile Overview</h2>
        <p className="mt-1 text-sm text-slate-400">Manage your profile details and preferences.</p>
      </div>

      <div className="rounded-3xl border border-white/5 bg-slate-950/20 p-6 flex flex-col sm:flex-row gap-6 items-center">
        {/* Avatar */}
        <div className="relative h-24 w-24 overflow-hidden rounded-full ring-2 ring-[var(--brand-accent)] bg-slate-900 flex-shrink-0 flex items-center justify-center">
          {session.user.image ? (
            <img src={session.user.image} alt={session.user.name} className="object-cover h-full w-full" />
          ) : (
            <span className="text-3xl font-semibold text-slate-300">
              {session.user.name ? session.user.name[0].toUpperCase() : "U"}
            </span>
          )}
        </div>

        {/* Details */}
        <div className="flex-grow space-y-4 text-center sm:text-left">
          <div className="grid gap-1">
            <span className="text-xs uppercase tracking-widest text-slate-500">Full Name</span>
            <span className="text-lg font-semibold text-white">{session.user.name}</span>
          </div>

          <div className="grid gap-1">
            <span className="text-xs uppercase tracking-widest text-slate-500">Email Address</span>
            <span className="text-sm text-slate-300">{session.user.email}</span>
          </div>
        </div>

        {/* Quick Edit */}
        {session.user.role === "user" && (
          <Link
            href="/dashboard/user/update-profile"
            className="rounded-full bg-white/5 border border-white/10 px-6 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-white/10"
          >
            Update Profile
          </Link>
        )}
      </div>
    </div>
  );
}
