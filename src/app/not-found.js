import Link from "next/link";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[calc(100vh-5rem)] items-center justify-center overflow-hidden bg-[#04111f]">
      <div className="absolute inset-0" style={{ background: "radial-gradient(circle at center, rgba(217,154,30,0.06), transparent 50%)" }} />
      <div className="relative mx-auto max-w-xl px-4 text-center">
        <span className="inline-flex rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs uppercase tracking-[0.35em] text-slate-300">
          Error 404
        </span>
        <h1 className="mt-8 text-8xl font-bold tracking-tight text-white">
          4
          <span className="text-[var(--brand-accent)]">0</span>
          4
        </h1>
        <p className="mt-4 text-lg leading-8 text-slate-400">
          This page doesn&apos;t exist or has been moved.
        </p>
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full px-7 py-3 text-sm font-semibold shadow-[0_18px_60px_-28px_rgba(217,154,30,0.7)] transition hover:bg-[#f8c232]"
            style={{ backgroundColor: "var(--brand-accent)", color: "var(--brand-accent-contrast)" }}
          >
            Back Home
          </Link>
          <Link
            href="/browse"
            className="inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-7 py-3 text-sm font-medium text-slate-200 transition hover:border-white/20 hover:text-white"
          >
            Browse Lawyers
          </Link>
        </div>
      </div>
    </section>
  );
}
