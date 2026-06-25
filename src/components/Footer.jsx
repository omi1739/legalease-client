"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const socialLinks = [
  { label: "Twitter", href: "#", path: "M22 5.7c-.8.3-1.6.5-2.5.6a4.4 4.4 0 0 0 1.9-2.4 8.8 8.8 0 0 1-2.8 1.1 4.4 4.4 0 0 0-7.5 4 12.5 12.5 0 0 1-9-4.6 4.4 4.4 0 0 0 1.4 5.9 4.4 4.4 0 0 1-2-.5v.1a4.4 4.4 0 0 0 3.5 4.3 4.4 4.4 0 0 1-2 .1 4.4 4.4 0 0 0 4.1 3 8.9 8.9 0 0 1-5.5 1.9A8.8 8.8 0 0 1 2 19.1a12.5 12.5 0 0 0 6.8 2 12.4 12.4 0 0 0 12.5-12.5v-.6A8.8 8.8 0 0 0 22 5.7Z" },
  { label: "LinkedIn", href: "#", path: "M6.9 21H2.6V8.8h4.3V21Zm-2.1-14.6a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Zm18.3 14.6h-4.3v-5.8c0-1.4 0-3.3-2-3.3-2 0-2.3 1.5-2.3 3.2V21h-4.3V8.8h4.1v1.7h.1c.6-1.2 2.1-2.4 4.4-2.4 4.7 0 5.6 3.1 5.6 7.2V21Z" },
  { label: "Facebook", href: "#", path: "M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.9.2 1.9.2v2.1h-1c-1 0-1.4.7-1.4 1.4V12h2.4l-.4 3h-2v7A10 10 0 0 0 22 12Z" },
];

const quickLinks = [
  { label: "About", href: "#" },
  { label: "Contact", href: "#" },
  { label: "Privacy Policy", href: "#" },
  { label: "Terms of Service", href: "#" },
];

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className="border-t border-[var(--border)] bg-[var(--surface-soft)] text-[var(--foreground)]">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_1.5fr_1fr]">
          <div className="space-y-5">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-3xl bg-[var(--surface)] ring-1 ring-[var(--border)]">
                <Image
                  src="/assets/logo.png"
                  alt="LegalEase logo"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-[var(--text-muted)]">
                  LegalEase
                </p>
                <p className="text-lg font-semibold text-[var(--foreground)]">
                  Smart legal hiring
                </p>
              </div>
            </div>
            <p className="max-w-md text-sm leading-7 text-[var(--text-muted)]">
              LegalEase connects clients and lawyers through a polished
              marketplace built for trust, transparency, and fast hiring.
            </p>
            <div className="flex items-center gap-3">
              {socialLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-[var(--border)] bg-[var(--surface)] text-[var(--text-muted)] transition hover:border-[var(--brand-accent)] hover:text-[var(--brand-accent)]"
                  aria-label={item.label}
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-5 w-5 fill-current"
                    aria-hidden="true"
                  >
                    <path d={item.path} />
                  </svg>
                </Link>
              ))}
            </div>
          </div>

          <div className="grid gap-8 sm:grid-cols-2">
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                Quick Links
              </h3>
              <ul className="mt-6 space-y-3 text-sm">
                {quickLinks.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-[var(--text-muted)] transition hover:text-[var(--foreground)]"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
                Contact
              </h3>
              <ul className="mt-6 space-y-3 text-sm">
                <li className="text-[var(--text-muted)]">contact@legalease.com</li>
                <li className="text-[var(--text-muted)]">+880-18461993103</li>
                <li className="text-[var(--text-muted)]">Banasree, Dhaka</li>
              </ul>
            </div>
          </div>

          <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-6 shadow-md">
            <h3 className="text-sm font-semibold uppercase tracking-[0.3em] text-[var(--text-muted)]">
              Newsletter
            </h3>
            <p className="mt-4 text-sm leading-7 text-[var(--text-muted)]">
              Stay updated with new lawyers, practice areas, and legal insights.
            </p>
            <form onSubmit={handleSubmit} className="mt-6 flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="rounded-full border border-[var(--border)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--foreground)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--brand-accent)]/50 transition"
              />
              <button
                type="submit"
                className="rounded-full px-5 py-3 text-sm font-semibold transition hover:opacity-90"
                style={{
                  backgroundColor: "var(--brand-accent)",
                  color: "var(--brand-accent-contrast)",
                }}
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="border-t border-[var(--border)] bg-[var(--background)] px-4 py-6 text-center text-sm text-[var(--text-muted)] sm:px-6">
        <p>&copy; 2026 LegalEase. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
